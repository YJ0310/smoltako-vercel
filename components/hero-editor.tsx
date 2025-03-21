"use client"

import type React from "react"

import { useEditMode } from "@/hooks/use-edit-mode"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export function HeroEditor() {
  const { siteConfig, updateSiteConfig, isLoading } = useEditMode()
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  if (isLoading || !siteConfig) {
    return <div className="flex items-center justify-center h-full">Loading...</div>
  }

  const handleChange = (field: string, value: string) => {
    const newConfig = { ...siteConfig }
    newConfig[field as keyof typeof newConfig] = value
    updateSiteConfig(newConfig)
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create a preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setLogoPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Upload the file
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("destination", "images/logo-new.png")

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        // Update the logo path in the site config
        // In a real implementation, you would update this in the site config
        alert("Logo uploaded successfully!")
      } else {
        alert("Failed to upload logo")
      }
    } catch (error) {
      console.error("Error uploading logo:", error)
      alert("An error occurred while uploading the logo")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>Edit the main hero section of your homepage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="heroTitle">Hero Title</Label>
            <Input
              id="heroTitle"
              value={siteConfig.heroTitle}
              onChange={(e) => handleChange("heroTitle", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
            <Textarea
              id="heroSubtitle"
              value={siteConfig.heroSubtitle}
              onChange={(e) => handleChange("heroSubtitle", e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logo</CardTitle>
          <CardDescription>Upload or change your site logo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
              <Image
                src={logoPreview || "/images/logo.png"}
                alt="Logo"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>

            <div>
              <Label htmlFor="logo-upload" className="cursor-pointer">
                <div className="flex items-center space-x-2">
                  <Button type="button" variant="outline" disabled={uploading}>
                    {uploading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Logo
                      </>
                    )}
                  </Button>
                </div>
              </Label>
              <Input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
                disabled={uploading}
              />
              <p className="text-sm text-gray-500 mt-2">Recommended size: 200x200px. Max file size: 2MB.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

