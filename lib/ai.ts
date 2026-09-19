// Unified AI router for the UNLEASHED classroom.
import * as gemini from "./gemini";

export type AiProvider = "gemini";

export function activeProvider(): AiProvider {
  return "gemini";
}

export const modelLabel = gemini.modelLabel;

type History = Array<{ role: "user" | "model"; text: string }>;

export async function generateText(
  visitorToken: string,
  systemInstruction: string,
  history: History,
  description: string,
): Promise<string> {
  return gemini.generateText(visitorToken, systemInstruction, history, description);
}

export async function generateJson<T>(
  visitorToken: string,
  systemInstruction: string,
  userPrompt: string,
  schema: Record<string, unknown>,
  description: string,
): Promise<T> {
  return gemini.generateJson<T>(visitorToken, systemInstruction, userPrompt, schema, description);
}
