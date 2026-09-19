import { NextRequest, NextResponse } from "next/server";
import { ensureDemoSeed } from "@/lib/seed";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      provider?: string;
      email?: string;
      password?: string;
      name?: string;
    };

    const isGoogle = body.provider === "google";
    const email = (body.email || (isGoogle ? "google.student@leashed.edu" : "student@leashed.edu")).toLowerCase();
    const name = body.name || (isGoogle ? "Google Learner" : email.split("@")[0]);
    const id = email.split("@")[0].replace(/[^a-z0-9_-]/g, "_");

    // Initialize course catalog and curriculum state for this user
    await ensureDemoSeed(id);

    const userPayload = {
      id,
      name,
      email,
      provider: isGoogle ? "google" : "credentials",
      loggedInAt: new Date().toISOString(),
    };

    const response = NextResponse.json({
      success: true,
      user: userPayload,
      redirect: "/classroom",
    });

    response.cookies.set("leashed_user", encodeURIComponent(JSON.stringify(userPayload)), {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Authentication failed" },
      { status: 500 },
    );
  }
}
