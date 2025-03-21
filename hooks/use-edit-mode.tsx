"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { SiteConfig } from "@/lib/site-config"

type EditModeContextType = {
  editMode: boolean
  toggleEditMode: () => void
  saveChanges: () => Promise<boolean>
  siteConfig: SiteConfig | null
  updateSiteConfig: (newConfig: SiteConfig) => void
  isLoading: boolean
  isSaving: boolean
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined)

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [editMode, setEditMode] = useState(false)
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null)
  const [originalConfig, setOriginalConfig] = useState<SiteConfig | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Fetch site configuration on initial load
  useEffect(() => {
    async function fetchSiteConfig() {
      try {
        const response = await fetch("/api/site-config")
        if (response.ok) {
          const data = await response.json()
          setSiteConfig(data)
          setOriginalConfig(JSON.parse(JSON.stringify(data))) // Deep copy
        }
      } catch (error) {
        console.error("Failed to fetch site configuration:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSiteConfig()
  }, [])

  // Toggle edit mode
  const toggleEditMode = () => {
    if (editMode) {
      // If exiting edit mode without saving, revert changes
      if (JSON.stringify(siteConfig) !== JSON.stringify(originalConfig)) {
        if (confirm("You have unsaved changes. Are you sure you want to exit edit mode?")) {
          setSiteConfig(JSON.parse(JSON.stringify(originalConfig))) // Reset to original
          setEditMode(false)
        }
      } else {
        setEditMode(false)
      }
    } else {
      setEditMode(true)
    }
  }

  // Update site configuration
  const updateSiteConfig = (newConfig: SiteConfig) => {
    setSiteConfig(newConfig)
  }

  // Save changes to the server
  const saveChanges = async (): Promise<boolean> => {
    if (!siteConfig) return false

    setIsSaving(true)
    try {
      const response = await fetch("/api/site-config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(siteConfig),
      })

      if (response.ok) {
        // Update the original config to match the current state
        setOriginalConfig(JSON.parse(JSON.stringify(siteConfig)))
        alert("Changes saved successfully!")
        return true
      } else {
        const error = await response.json()
        alert(`Failed to save changes: ${error.message || "Unknown error"}`)
        return false
      }
    } catch (error) {
      console.error("Error saving changes:", error)
      alert("An error occurred while saving changes.")
      return false
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <EditModeContext.Provider
      value={{
        editMode,
        toggleEditMode,
        saveChanges,
        siteConfig,
        updateSiteConfig,
        isLoading,
        isSaving,
      }}
    >
      {children}
    </EditModeContext.Provider>
  )
}

export function useEditMode() {
  const context = useContext(EditModeContext)
  if (context === undefined) {
    throw new Error("useEditMode must be used within an EditModeProvider")
  }
  return context
}

