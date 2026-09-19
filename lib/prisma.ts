// In-memory data store for the UNLEASHED classroom environment.
// Implements the PrismaClient interface used by lib/db.ts and lib/seed.ts.

type QueryOptions = {
  where?: Record<string, any>;
  orderBy?: Record<string, "asc" | "desc">;
  take?: number;
  include?: Record<string, any>;
  select?: Record<string, boolean>;
};

function matchesWhere(item: any, where?: Record<string, any>): boolean {
  if (!where) return true;
  for (const [key, value] of Object.entries(where)) {
    if (value === undefined) continue;

    // Handle compound keys like ownerId_courseId or ownerId_courseId_assignmentKey
    if (typeof value === "object" && value !== null && !(value instanceof Date)) {
      if ("in" in value && Array.isArray(value.in)) {
        if (!value.in.includes(item[key])) return false;
        continue;
      }
      // Check if it's a compound key object
      let compoundMatch = true;
      for (const [k, v] of Object.entries(value)) {
        if (item[k] !== v) {
          compoundMatch = false;
          break;
        }
      }
      if (compoundMatch) continue;
      return false;
    }

    if (item[key] !== value) return false;
  }
  return true;
}

function applyOrderBy(items: any[], orderBy?: Record<string, "asc" | "desc">): any[] {
  if (!orderBy) return items;
  const sorted = [...items];
  const [field, direction] = Object.entries(orderBy)[0] || [];
  if (!field) return sorted;
  sorted.sort((a, b) => {
    const valA = a[field];
    const valB = b[field];
    if (valA === valB) return 0;
    if (valA === null || valA === undefined) return 1;
    if (valB === null || valB === undefined) return -1;
    if (direction === "desc") {
      return valA > valB ? -1 : 1;
    }
    return valA > valB ? 1 : -1;
  });
  return sorted;
}

class InMemoryCollection<T extends Record<string, any>> {
  public items: T[] = [];
  private nextId = 1;

  constructor(private getCourseById?: (id: number) => any) {}

  private resolveIncludes(item: T, include?: Record<string, any>): T {
    if (!include) return item;
    const copy = { ...item };
    if (include.course && this.getCourseById && copy.courseId) {
      const course = this.getCourseById(copy.courseId);
      if (course) {
        if (typeof include.course === "object" && include.course.select) {
          const selected: Record<string, any> = {};
          for (const key of Object.keys(include.course.select)) {
            selected[key] = course[key];
          }
          (copy as any).course = selected;
        } else {
          (copy as any).course = course;
        }
      }
    }
    return copy;
  }

  async findMany(options: QueryOptions = {}): Promise<T[]> {
    let result = this.items.filter((item) => matchesWhere(item, options.where));
    if (options.orderBy) {
      result = applyOrderBy(result, options.orderBy);
    }
    if (options.take && options.take > 0) {
      result = result.slice(0, options.take);
    }
    return result.map((item) => this.resolveIncludes(item, options.include));
  }

  async findFirst(options: QueryOptions = {}): Promise<T | null> {
    const rows = await this.findMany({ ...options, take: 1 });
    return rows[0] || null;
  }

  async count(options: { where?: Record<string, any> } = {}): Promise<number> {
    return this.items.filter((item) => matchesWhere(item, options.where)).length;
  }

  async create({ data }: { data: any }): Promise<T> {
    const item = {
      id: data.id ?? this.nextId++,
      createdAt: data.createdAt ?? new Date(),
      ...data,
    };
    this.items.push(item);
    return item;
  }

  async update({ where, data }: { where: Record<string, any>; data: any }): Promise<T | null> {
    const item = this.items.find((i) => matchesWhere(i, where));
    if (!item) return null;
    Object.assign(item, data);
    return item;
  }

  async updateMany({ where, data }: { where: Record<string, any>; data: any }): Promise<{ count: number }> {
    let count = 0;
    for (const item of this.items) {
      if (matchesWhere(item, where)) {
        Object.assign(item, data);
        count++;
      }
    }
    return { count };
  }

  async upsert({ where, update, create }: { where: Record<string, any>; update: any; create: any }): Promise<T> {
    const existing = this.items.find((i) => matchesWhere(i, where));
    if (existing) {
      Object.assign(existing, update);
      return existing;
    }
    return this.create({ data: create });
  }

  async deleteMany(options: { where?: Record<string, any> } = {}): Promise<{ count: number }> {
    const before = this.items.length;
    this.items = this.items.filter((i) => !matchesWhere(i, options.where));
    return { count: before - this.items.length };
  }
}

class ClassroomDatabase {
  public course: InMemoryCollection<any>;
  public courseEnrollment: InMemoryCollection<any>;
  public classroomMeeting: InMemoryCollection<any>;
  public dashboardProfessorMessage: InMemoryCollection<any>;
  public gradebookEntry: InMemoryCollection<any>;
  public humanNeedQueue: InMemoryCollection<any>;
  public learnerAssignmentState: InMemoryCollection<any>;
  public learnerEvent: InMemoryCollection<any>;
  public learnerEvidence: InMemoryCollection<any>;
  public learnerFile: InMemoryCollection<any>;
  public learnerMessage: InMemoryCollection<any>;
  public learnerNote: InMemoryCollection<any>;
  public learningAttempt: InMemoryCollection<any>;
  public learningDay: InMemoryCollection<any>;
  public learningDayEvent: InMemoryCollection<any>;
  public professorMessage: InMemoryCollection<any>;
  public schoolScheduleBlock: InMemoryCollection<any>;
  public knowledgeChunk: InMemoryCollection<any>;

  constructor() {
    const getCourse = (id: number) => this.course.items.find((c) => c.id === id);

    this.course = new InMemoryCollection();
    this.courseEnrollment = new InMemoryCollection(getCourse);
    this.classroomMeeting = new InMemoryCollection(getCourse);
    this.dashboardProfessorMessage = new InMemoryCollection();
    this.gradebookEntry = new InMemoryCollection(getCourse);
    this.humanNeedQueue = new InMemoryCollection();
    this.learnerAssignmentState = new InMemoryCollection();
    this.learnerEvent = new InMemoryCollection();
    this.learnerEvidence = new InMemoryCollection();
    this.learnerFile = new InMemoryCollection();
    this.learnerMessage = new InMemoryCollection();
    this.learnerNote = new InMemoryCollection();
    this.learningAttempt = new InMemoryCollection();
    this.learningDay = new InMemoryCollection(getCourse);
    this.learningDayEvent = new InMemoryCollection();
    this.professorMessage = new InMemoryCollection();
    this.schoolScheduleBlock = new InMemoryCollection(getCourse);
    this.knowledgeChunk = new InMemoryCollection();
  }
}

const globalForDb = globalThis as unknown as {
  __classroomDb: ClassroomDatabase | undefined;
};

export const prisma = (globalForDb.__classroomDb ??= new ClassroomDatabase());
