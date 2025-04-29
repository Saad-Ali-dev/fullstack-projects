import { OpenAI } from "openai"; 
import { NextResponse } from 'next/server'; 

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export async function POST(request) {
  const { messages } = await request.json(); 

  try {
      const stream = await openai.chat.completions.create({
          model: "gemini-2.0-flash-lite", 
          messages: messages, 
          stream: true,
      });

      // 2. Create a stream to send back to the frontend
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
          }
      });

      // 5. Return the stream response
      return new Response(readableStream, {
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });

  } catch (error) {
      console.error("API Error:", error);
      return NextResponse.json({ error: 'Failed to get streaming response' }, { status: 500 });
  }
}