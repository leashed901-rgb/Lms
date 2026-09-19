import { NextRequest, NextResponse } from "next/server";
import { analyzePracticalVideoFrame } from "@/lib/gemini";
import { getVisitor } from "@/lib/visitor";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const visitor = getVisitor(request);
    const body = (await request.json()) as {
      image?: string;
      courseTitle?: string;
      taskDescription?: string;
    };

    const image = body.image || "";
    const courseTitle = body.courseTitle || "Professional Pet Care Practicum";
    const taskDescription = body.taskDescription || "Safety & Table Handling Protocol Check";

    if (!image) {
      return NextResponse.json({ error: "Camera image frame is required for practical evaluation." }, { status: 400 });
    }

    const evaluation = await analyzePracticalVideoFrame(image, courseTitle, taskDescription);

    return NextResponse.json({
      success: true,
      evaluation,
      visitorId: visitor.id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Video evaluation failed." },
      { status: 500 },
    );
  }
}
