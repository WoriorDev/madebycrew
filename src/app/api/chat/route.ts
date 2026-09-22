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
  fallbackAnswer,
  hasAiCredentials,
} from "@/lib/crew-knowledge";

export const maxDuration = 30;

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

function streamLocalReply(text: string) {
  return createUIMessageStreamResponse({
    stream: createUIMessageStream({
      execute({ writer }) {
        writer.write({ type: "start" });
        writer.write({ type: "text-start", id: "local" });

        const chunks = text.match(/.{1,24}(\s|$)/g) ?? [text];
        for (const chunk of chunks) {
          writer.write({ type: "text-delta", id: "local", delta: chunk });
        }

        writer.write({ type: "text-end", id: "local" });
      },
    }),
  });
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const userText = lastUserText(messages);

  if (!hasAiCredentials()) {
    return streamLocalReply(fallbackAnswer(userText));
  }

  try {
    const result = streamText({
      model: "google/gemini-2.5-flash",
      instructions: CREW_SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    });
  } catch {
    return streamLocalReply(fallbackAnswer(userText));
  }
}
