import type { NextRequest } from "next/server";

export type Visitor = {
  id: string;
  name: string;
  email: string | null;
  token: string;
};

const DEFAULT_DEMO: Visitor = {
  id: "demo-avery",
  name: "Avery Johnson",
  email: "avery.johnson@classroom.demo",
  token: "demo-token",
};

export function getVisitor(request: NextRequest): Visitor {
  try {
    const userCookie = request.cookies.get("leashed_user")?.value;
    if (userCookie) {
      const parsed = JSON.parse(decodeURIComponent(userCookie));
      if (parsed && parsed.email) {
        const cleanId = (parsed.id || parsed.email.split("@")[0] || "learner")
          .toLowerCase()
          .replace(/[^a-z0-9_-]/g, "_");
        return {
          id: cleanId,
          name: parsed.name || parsed.email.split("@")[0],
          email: parsed.email,
          token: `token-${cleanId}`,
        };
      }
    }
  } catch {
    // Fall back to default demo
  }
  return DEFAULT_DEMO;
}
