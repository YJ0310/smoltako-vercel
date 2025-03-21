// app/api/upload-image/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const destination = formData.get("destination") as string;

    if (!file || !destination) {
      return NextResponse.json(
        { success: false, error: "Missing file or destination" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(process.cwd(), "public", destination);

    // Ensure directory exists
    const dir = path.dirname(filePath);
    await fs.promises.mkdir(dir, { recursive: true });

    // Write the file
    await fs.promises.writeFile(filePath, buffer);

    return NextResponse.json({ success: true, url: `/${destination}` });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload image" },
      { status: 500 }
    );
  }
}