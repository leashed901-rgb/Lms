import { NextRequest, NextResponse } from "next/server";
import { generateVoiceAudio } from "@/lib/gemini";
import { getVisitor } from "@/lib/visitor";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const visitor = getVisitor(request);
    const body = (await request.json()) as { text?: string; voiceName?: string };
    const text = (body.text || "").trim();
    const voiceName = body.voiceName || "Zephyr";

    if (!text) {
      return NextResponse.json({ error: "Text is required for voice synthesis." }, { status: 400 });
    }

    const { audioBase64, mimeType } = await generateVoiceAudio(text, voiceName);

    return NextResponse.json({
      success: true,
      audioBase64,
      mimeType,
      voiceName,
      visitorId: visitor.id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Voice generation failed." },
      { status: 500 },
    );
  }
}
