import { type NextRequest, NextResponse } from "next/server"
import { uploadImage } from "@/lib/editor-utils"

export const runtime = "edge" // Use Edge runtime for Cloudflare compatibility

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const destination = formData.get("destination") as string

    if (!file || !destination) {
      return NextResponse.json({ error: "File and destination are required" }, { status: 400 })
    }

    const filePath = await uploadImage(file, destination)

    return NextResponse.json({
      success: true,
      filePath,
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}

