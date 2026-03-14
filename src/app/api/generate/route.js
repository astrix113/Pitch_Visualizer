import { NextResponse } from "next/server";
import { segmentText } from "@/lib/segmentText";
import { enhancePrompt } from "@/lib/promptGenerator";
import { generateImage } from "@/lib/imageGenerator";

export const maxDuration = 60;

export async function POST(req) {
  try {
    const body = await req.json();
    const { text, style } = body;

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const sentences = segmentText(text).slice(0, 4); // limit scenes

    if (sentences.length === 0) {
      return NextResponse.json(
        { error: "No valid sentences found in text" },
        { status: 400 },
      );
    }

    const scenes = [];

    for (const sentence of sentences) {
      try {
        const prompt = await enhancePrompt(sentence, style || "cinematic");

        const image = await generateImage(prompt);

        scenes.push({
          text: sentence,
          prompt,
          image,
        });
      } catch (error) {
        console.error("Scene generation error:", error);

        scenes.push({
          text: sentence,
          prompt: "Failed to generate",
          image: "",
        });
      }
    }

    return NextResponse.json({ scenes });
  } catch (error) {
    console.error("Generate API error:", error);

    return NextResponse.json(
      { error: "Failed to generate storyboard" },
      { status: 500 },
    );
  }
}
