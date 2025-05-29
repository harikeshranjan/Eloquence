import { dbConnect } from "@/lib/db";
import Paragraph from "@/models/paragraph";
import { NextRequest, NextResponse } from "next/server";

// fetching a specific paragraph by ID
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

// handling the DELETE request to delete a specific paragraph by ID
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

// handling the PUT request to update a specific paragraph by ID
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ error: "Paragraph ID is required" }, { status: 400 });
    }

    const body = await request.json();
    const { title, content, tags } = body;

    if (!title || !content || !Array.isArray(tags)){
      return NextResponse.json({ error: "Title, content, and tags are required" }, { status: 400 });
    }

    const updatedParagraph = await Paragraph.findByIdAndUpdate(
      id,
      { title, content, tags },
      { new: true }
    );

    if (!updatedParagraph) {
      return NextResponse.json({ error: "Paragraph not found" }, { status: 404 });
    }

    return NextResponse.json(updatedParagraph, { status: 200 });
  } catch (error) {
    console.error("Error updating the paragraph:", error);
    return NextResponse.json({ error: "Failed to update the paragraph" }, { status: 500 });
  }
}