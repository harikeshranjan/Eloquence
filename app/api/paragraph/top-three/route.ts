import { dbConnect } from "@/lib/db";
import Paragraph from "@/models/paragraph";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const topThreeParagraphs = await Paragraph.find({}).sort({ createdAt: -1 }).limit(3);
    return NextResponse.json(topThreeParagraphs, { status: 200 });
  } catch (error) {
    console.error("Error fetching top three paragraphs:", error);
    return NextResponse.json({ error: "Failed to fetch top three paragraphs" }, { status: 500 });
  }
}