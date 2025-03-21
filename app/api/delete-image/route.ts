// app/api/delete-image/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const { imagePath } = await request.json();

    if (!imagePath) {
      return NextResponse.json(
        { success: false, error: "Missing image path" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "public", imagePath.replace(/^\//, ""));
    await fs.promises.unlink(filePath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete image" },
      { status: 500 }
    );
  }
}