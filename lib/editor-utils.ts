// lib/editor-utils.ts
import fs from "fs";
import path from "path";

export function readFile(filePath: string) {
  return fs.readFileSync(filePath, "utf-8");
}

import type { SiteConfig } from "./site-config"

// Function to save site configuration to the file system
export async function saveSiteConfig(config: SiteConfig): Promise<boolean> {
  try {
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

export default siteConfig;`

    // Check if we're in a Cloudflare environment
    if (typeof globalThis.SITE_CONFIG_BUCKET !== "undefined") {
      // Use R2 storage in Cloudflare
      await globalThis.SITE_CONFIG_BUCKET.put("site-config.ts", configContent)
    } else {
      // Fallback to local file system
      await fs.promises.writeFile(path.join(process.cwd(), "lib", "site-config.ts"), configContent)
    }

    return true
  } catch (error) {
    console.error("Error saving site config:", error)
    return false
  }
}

// Function to upload an image
export async function uploadImage(file: File, destination: string): Promise<string> {
  try {
    const buffer = Buffer.from(await file.arrayBuffer())

    // Check if we're in a Cloudflare environment
    if (typeof globalThis.IMAGES_BUCKET !== "undefined") {
      // Use R2 storage in Cloudflare
      await globalThis.IMAGES_BUCKET.put(destination.replace(/^\//, ""), buffer)
    } else {
      // Fallback to local file system
      const filePath = path.join(process.cwd(), "public", destination)

      // Ensure directory exists
      const dir = path.dirname(filePath)
      await fs.promises.mkdir(dir, { recursive: true })

      // Write the file
      await fs.promises.writeFile(filePath, buffer)
    }

    return `/${destination}`
  } catch (error) {
    console.error("Error uploading image:", error)
    throw new Error("Failed to upload image")
  }
}

// Function to delete an image
export async function deleteImage(imagePath: string): Promise<boolean> {
  try {
    const normalizedPath = imagePath.replace(/^\//, "")

    // Check if we're in a Cloudflare environment
    if (typeof globalThis.IMAGES_BUCKET !== "undefined") {
      // Use R2 storage in Cloudflare
      await globalThis.IMAGES_BUCKET.delete(normalizedPath)
    } else {
      // Fallback to local file system
      const filePath = path.join(process.cwd(), "public", normalizedPath)
      await fs.promises.unlink(filePath)
    }

    return true
  } catch (error) {
    console.error("Error deleting image:", error)
    return false
  }
}

const saveConfig = async (config: SiteConfig) => {
  const response = await fetch("/api/save-site-config", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(config),
  });

  if (!response.ok) {
    throw new Error("Failed to save site config");
  }
};

const uploadImage = async (file: File, destination: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("destination", destination);

  const response = await fetch("/api/upload-image", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await response.json();
  return data.url;
};

const deleteImage = async (imagePath: string) => {
  const response = await fetch("/api/delete-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imagePath }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete image");
  }
};