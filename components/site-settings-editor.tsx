"use client"

import { useEditMode } from "@/hooks/use-edit-mode"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Twitter, Linkedin, Instagram } from "lucide-react"

export function SiteSettingsEditor() {
  const { siteConfig, updateSiteConfig, isLoading } = useEditMode()

  if (isLoading || !siteConfig) {
    return <div className="flex items-center justify-center h-full">Loading...</div>
  }

  const handleChange = (field: string, value: string) => {
    const newConfig = { ...siteConfig }

    // Handle nested fields like socialLinks.github
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      newConfig[parent as keyof typeof newConfig][child] = value
    } else {
      newConfig[field as keyof typeof newConfig] = value
    }

    updateSiteConfig(newConfig)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Site Information</CardTitle>
          <CardDescription>Basic information about your website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              value={siteConfig.siteName}
              onChange={(e) => handleChange("siteName", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="siteDescription">Site Description</Label>
            <Textarea
              id="siteDescription"
              value={siteConfig.siteDescription}
              onChange={(e) => handleChange("siteDescription", e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input
              id="contactEmail"
              type="email"
              value={siteConfig.contactEmail}
              onChange={(e) => handleChange("contactEmail", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
          <CardDescription>Your social media profiles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="github" className="flex items-center">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Label>
            <Input
              id="github"
              value={siteConfig.socialLinks.github}
              onChange={(e) => handleChange("socialLinks.github", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter" className="flex items-center">
              <Twitter className="mr-2 h-4 w-4" />
              Twitter
            </Label>
            <Input
              id="twitter"
              value={siteConfig.socialLinks.twitter}
              onChange={(e) => handleChange("socialLinks.twitter", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin" className="flex items-center">
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Label>
            <Input
              id="linkedin"
              value={siteConfig.socialLinks.linkedin}
              onChange={(e) => handleChange("socialLinks.linkedin", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram" className="flex items-center">
              <Instagram className="mr-2 h-4 w-4" />
              Instagram
            </Label>
            <Input
              id="instagram"
              value={siteConfig.socialLinks.instagram}
              onChange={(e) => handleChange("socialLinks.instagram", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About Text</CardTitle>
          <CardDescription>Information about you or your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            id="aboutText"
            value={siteConfig.aboutText}
            onChange={(e) => handleChange("aboutText", e.target.value)}
            rows={5}
          />
        </CardContent>
      </Card>
    </div>
  )
}

