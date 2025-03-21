"use client"

import type React from "react"

import { useEditMode } from "@/hooks/use-edit-mode"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Upload, Trash2, GripVertical, ExternalLink } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import type { Platform } from "@/lib/site-config"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"

export function PlatformsEditor() {
  const { siteConfig, updateSiteConfig, isLoading } = useEditMode()
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null)
  const [newTag, setNewTag] = useState("")
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  if (isLoading || !siteConfig) {
    return <div className="flex items-center justify-center h-full">Loading...</div>
  }

  const handleAddPlatform = () => {
    const newPlatform: Platform = {
      id: `platform-${Date.now()}`,
      name: "New Platform",
      description: "Description of the new platform",
      url: "https://example.com",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["New"],
      featured: true,
      order: siteConfig.platforms.length + 1,
    }

    const newConfig = { ...siteConfig }
    newConfig.platforms = [...newConfig.platforms, newPlatform]
    updateSiteConfig(newConfig)
    setEditingPlatform(newPlatform)
  }

  const handleDeletePlatform = (id: string) => {
    if (!confirm("Are you sure you want to delete this platform?")) return

    const newConfig = { ...siteConfig }
    newConfig.platforms = newConfig.platforms.filter((p) => p.id !== id)
    updateSiteConfig(newConfig)

    if (editingPlatform?.id === id) {
      setEditingPlatform(null)
    }
  }

  const handleEditPlatform = (platform: Platform) => {
    setEditingPlatform(platform)
    setImagePreview(null)
  }

  const handleUpdatePlatform = (field: keyof Platform, value: any) => {
    if (!editingPlatform) return

    const updatedPlatform = { ...editingPlatform, [field]: value }
    setEditingPlatform(updatedPlatform)

    const newConfig = { ...siteConfig }
    newConfig.platforms = newConfig.platforms.map((p) => (p.id === updatedPlatform.id ? updatedPlatform : p))
    updateSiteConfig(newConfig)
  }

  const handleAddTag = () => {
    if (!newTag.trim() || !editingPlatform) return

    const updatedTags = [...editingPlatform.tags, newTag.trim()]
    handleUpdatePlatform("tags", updatedTags)
    setNewTag("")
  }

  const handleRemoveTag = (tag: string) => {
    if (!editingPlatform) return

    const updatedTags = editingPlatform.tags.filter((t) => t !== tag)
    handleUpdatePlatform("tags", updatedTags)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingPlatform) return

    // Create a preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Upload the file
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append(
        "destination",
        `images/platforms/${editingPlatform.id}-${Date.now()}.${file.name.split(".").pop()}`,
      )

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        handleUpdatePlatform("image", data.filePath)
        alert("Image uploaded successfully!")
      } else {
        alert("Failed to upload image")
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("An error occurred while uploading the image")
    } finally {
      setUploading(false)
    }
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(siteConfig.platforms)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update order property
    const reorderedItems = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }))

    const newConfig = { ...siteConfig, platforms: reorderedItems }
    updateSiteConfig(newConfig)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Platforms</h3>
        <Button onClick={handleAddPlatform} className="bg-[#3c294d] hover:bg-[#3c294d]/80">
          <Plus className="mr-2 h-4 w-4" />
          Add Platform
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="platforms">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                  {siteConfig.platforms.map((platform, index) => (
                    <Draggable key={platform.id} draggableId={platform.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`p-3 border rounded-md flex items-center justify-between ${
                            editingPlatform?.id === platform.id ? "border-[#3c294d] bg-[#3c294d]/5" : "border-gray-200"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div {...provided.dragHandleProps} className="cursor-grab">
                              <GripVertical className="h-5 w-5 text-gray-400" />
                            </div>
                            <div>
                              <p className="font-medium">{platform.name}</p>
                              <p className="text-sm text-gray-500 truncate max-w-[150px]">{platform.url}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleEditPlatform(platform)}
                            >
                              <span className="sr-only">Edit</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                <path d="m15 5 4 4" />
                              </svg>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => handleDeletePlatform(platform.id)}
                            >
                              <span className="sr-only">Delete</span>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className="md:col-span-2">
          {editingPlatform ? (
            <Card>
              <CardHeader>
                <CardTitle>Edit Platform</CardTitle>
                <CardDescription>Update the details of this platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Name</Label>
                  <Input
                    id="platform-name"
                    value={editingPlatform.name}
                    onChange={(e) => handleUpdatePlatform("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platform-description">Description</Label>
                  <Textarea
                    id="platform-description"
                    value={editingPlatform.description}
                    onChange={(e) => handleUpdatePlatform("description", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platform-url">URL</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="platform-url"
                      value={editingPlatform.url}
                      onChange={(e) => handleUpdatePlatform("url", e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0"
                      onClick={() => window.open(editingPlatform.url, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Featured</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={editingPlatform.featured}
                      onCheckedChange={(checked) => handleUpdatePlatform("featured", checked)}
                    />
                    <span className="text-sm text-gray-500">
                      {editingPlatform.featured ? "This platform is featured" : "This platform is not featured"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {editingPlatform.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 ml-1"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                    />
                    <Button variant="outline" onClick={handleAddTag}>
                      Add
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Image</Label>
                  <div className="flex items-start space-x-4">
                    <div className="w-32 h-24 rounded-md overflow-hidden border border-gray-200">
                      <Image
                        src={imagePreview || editingPlatform.image}
                        alt={editingPlatform.name}
                        width={128}
                        height={96}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <div>
                      <Label htmlFor="platform-image" className="cursor-pointer">
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
                                Upload Image
                              </>
                            )}
                          </Button>
                        </div>
                      </Label>
                      <Input
                        id="platform-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={uploading}
                      />
                      <p className="text-sm text-gray-500 mt-2">Recommended size: 800x600px. Max file size: 2MB.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditingPlatform(null)}>
                  Cancel
                </Button>
                <Button className="bg-[#3c294d] hover:bg-[#3c294d]/80" onClick={() => setEditingPlatform(null)}>
                  Done
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="flex items-center justify-center h-full border-2 border-dashed rounded-lg p-12 text-center">
              <div>
                <h3 className="text-lg font-medium mb-2">Select a Platform</h3>
                <p className="text-gray-500 mb-4">
                  Click on a platform from the list to edit its details, or add a new one.
                </p>
                <Button onClick={handleAddPlatform} className="bg-[#3c294d] hover:bg-[#3c294d]/80">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Platform
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

