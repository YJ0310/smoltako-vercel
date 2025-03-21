import { type NextRequest, NextResponse } from "next/server"
import { saveSiteConfig } from "@/lib/editor-utils"
import siteConfig, { type SiteConfig } from "@/lib/site-config"

export const runtime = "edge" // Use Edge runtime for Cloudflare compatibility

export async function GET() {
  return NextResponse.json(siteConfig)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate the data
    if (!data || typeof data !== "object") {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
    }

    // Save the updated config
    const success = await saveSiteConfig(data as SiteConfig)

    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Failed to save configuration" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error updating site config:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

