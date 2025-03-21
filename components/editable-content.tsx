"use client"

import { useState, useEffect, type ReactNode } from "react"
import { useEditMode } from "@/hooks/use-edit-mode"
import { Pencil, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

interface EditableContentProps {
  children: ReactNode
  type?: "text" | "heading" | "paragraph"
  className?: string
  id: string
}

export default function EditableContent({ children, type = "paragraph", className = "", id }: EditableContentProps) {
  const { editMode } = useEditMode()
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState<string>("")

  useEffect(() => {
    // Convert ReactNode to string if possible
    if (typeof children === "string") {
      setContent(children)
    } else if (
      children &&
      typeof children === "object" &&
      "props" in children &&
      typeof children.props.children === "string"
    ) {
      setContent(children.props.children)
    }
  }, [children])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)

    // Mark that changes have been made
    if (window.markAsChanged) {
      window.markAsChanged()
    }

    // In a real implementation, you would save this to a database or API
    console.log(`Content with ID ${id} updated to: ${content}`)
  }

  if (!editMode) {
    // When not in edit mode, render the children normally
    return <>{children}</>
  }

  // When in edit mode but not actively editing this element
  if (!isEditing) {
    return (
      <div className="group relative">
        {children}
        <Button
          size="icon"
          variant="outline"
          className="absolute -right-10 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleEdit}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  // When actively editing this element
  return (
    <div className="relative">
      {type === "heading" && (
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`font-bold ${className}`}
          autoFocus
        />
      )}

      {type === "paragraph" && (
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`min-h-[100px] ${className}`}
          autoFocus
        />
      )}

      {type === "text" && (
        <Input value={content} onChange={(e) => setContent(e.target.value)} className={className} autoFocus />
      )}

      <Button size="icon" variant="outline" className="absolute -right-10 top-0" onClick={handleSave}>
        <Check className="h-4 w-4" />
      </Button>
    </div>
  )
}

