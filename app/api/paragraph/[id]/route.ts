import { dbConnect } from "@/lib/db";
import Paragraph from "@/models/paragraph";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ error: "Paragraph ID is required" }, { status: 400 });
    }

    const paragraph = await Paragraph.findById(id);
    if (!paragraph) {
      return NextResponse.json({ error: "Paragraph not found" }, { status: 404 });
    }

    return NextResponse.json(paragraph, { status: 200 });
  } catch (error) {
    console.error("Error fetching the paragraph:", error);
    return NextResponse.json({ error: "Failed to fetch the paragraph" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();

    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ error: "Paragraph ID is required" }, { status: 400 });
    }

    const paragraph = await Paragraph.findByIdAndDelete(id);
    if (!paragraph) {
      return NextResponse.json({ error: "Paragraph not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Paragraph deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting the paragraph:", error);
    return NextResponse.json({ error: "Failed to delete the paragraph" }, { status: 500 });
  }
}