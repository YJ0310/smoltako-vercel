// app/api/save-site-config/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { SiteConfig } from "@/lib/site-config";

export async function POST(request: Request) {
  try {
    const config: SiteConfig = await request.json();

    // Format the config as a TypeScript file
    const configContent = `// Site configuration that can be edited through the admin interface
// This file will be updated when changes are saved in the editor

export type Platform = {
  id: string;
  name: string;
  description: string;
  url: string;
  image: string;
  tags: string[];
  featured: boolean;
  order: number;
}

export type SiteConfig = {
  siteName: string;
  siteDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  contactEmail: string;
  socialLinks: {
    github: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  platforms: Platform[];
}

const siteConfig: SiteConfig = ${JSON.stringify(config, null, 2)};

export default siteConfig;`;

    // Save the config to the file system
    await fs.promises.writeFile(
      path.join(process.cwd(), "lib", "site-config.ts"),
      configContent
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving site config:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save site config" },
      { status: 500 }
    );
  }
}