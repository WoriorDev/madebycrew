import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import {
  CREW_SYSTEM_PROMPT,
  hasAiCredentials,
  localBotReply,
} from "@/lib/crew-knowledge";

export const maxDuration = 30;

const MAX_MESSAGES = 24;
const MAX_CHARS = 1200;

function lastUserText(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i];
    if (message.role !== "user") continue;
    return message.parts
      .filter((part): part is { type: "text"; text: string } => part.type === "text")
      .map((part) => part.text)
      .join(" ")
      .trim();
  }
  return "";
}

function trimHistory(messages: UIMessage[]): UIMessage[] {
  if (messages.length <= MAX_MESSAGES) return messages;
  return messages.slice(-MAX_MESSAGES);
}

async function streamLocalReply(text: string) {
  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      writer.write({ type: "start" });
      writer.write({ type: "text-start", id: "local" });

      // Natural pacing — word-ish chunks with tiny delays
      const chunks = text.match(/\S+\s*|\n+/g) ?? [text];
      for (const chunk of chunks) {
        writer.write({ type: "text-delta", id: "local", delta: chunk });
        await new Promise((r) => setTimeout(r, chunk === "\n" ? 18 : 12));
      }

      writer.write({ type: "text-end", id: "local" });
      writer.write({ type: "finish", finishReason: "stop" });
    },
  });

  return createUIMessageStreamResponse({ stream });
}

export async function POST(req: Request) {
  let messages: UIMessage[] = [];

  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  messages = trimHistory(messages);
  const userText = lastUserText(messages).slice(0, MAX_CHARS);

  if (!userText) {
    return streamLocalReply(
      "Napisz pytanie o ofertę, proces albo kontakt — ogarnę temat.",
    );
  }

  if (!hasAiCredentials()) {
    return streamLocalReply(localBotReply(userText).answer);
  }

  try {
    const result = streamText({
      model: "google/gemini-2.5-flash",
      instructions: CREW_SYSTEM_PROMPT,
      temperature: 0.55,
      maxOutputTokens: 500,
      messages: await convertToModelMessages(messages),
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    });
  } catch {
    return streamLocalReply(localBotReply(userText).answer);
  }
}
