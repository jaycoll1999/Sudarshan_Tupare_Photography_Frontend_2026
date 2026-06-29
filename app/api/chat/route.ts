import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { 
            role: "system", 
            content: `You are the official chatbot for Sidography Photography & Films. Be polite, helpful, and concise. 
Here is all the information about our business:
- Our Services: Wedding Photography, Pre-wedding shoots, Maternity shoots, Event photography, and Cinematic films.
- How to Book: Users should use the WhatsApp button or go to the /booking page.
- Portfolio: We specialize in candid and cinematic wedding films.
- Contact: Phone: +91 9637577691.
Answer any user questions using ONLY this information. If you don't know the answer, tell them to contact us directly on WhatsApp.`
          },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error("No response from OpenRouter");
    }

    return NextResponse.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Failed to fetch response" }, { status: 500 });
  }
}
