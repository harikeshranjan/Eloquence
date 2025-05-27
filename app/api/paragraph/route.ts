import { dbConnect } from "@/lib/db";
import Paragraph from "@/models/paragraph";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { title, content, tags, wordCount, charCount } = await request.json();

    if (!title || !content || !wordCount || !charCount) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    if (tags && !Array.isArray(tags)) {
      return NextResponse.json({ error: "Tags must be an array" }, { status: 400 });
    }

    await dbConnect();

    const newParagraph = await Paragraph.create({
      title,
      content,
      tags: tags || [],
      wordCount,
      charCount,
    });

    return NextResponse.json(newParagraph, { status: 201 });
  } catch (error) {
    console.error("Error creating paragraph:", error);
    return NextResponse.json({error: "Failed to create paragraph"}, { status: 500 });
  }
}

// fetching all paragraphs
export async function GET() {
  try {
    await dbConnect();

    const paragraphs = await Paragraph.find().sort({ createdAt: -1 });
    return NextResponse.json(paragraphs, { status: 200 });
  } catch (error) {
    console.error("Error fetching paragraphs:", error);
    return NextResponse.json({ error: "Failed to fetch paragraphs" }, { status: 500 });
  }
}