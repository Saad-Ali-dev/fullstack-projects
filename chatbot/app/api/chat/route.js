import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1/",
});

export async function POST(request) {
  const { messages } = await request.json();

  try {
    const stream = await openai.chat.completions.create({
      model: "moonshotai/kimi-k2-instruct",
      messages: messages,
      stream: true,
    });

    //  Create a stream to send back to the frontend
    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }
        controller.close();
      },
    });

    //  Return the stream response
    return new Response(readableStream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to get streaming response" },
      { status: 500 },
    );
  }
}
