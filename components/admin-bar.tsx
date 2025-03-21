"use client"

import { useEditMode } from "@/hooks/use-edit-mode"
import { Save, X, Settings, Layout, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteSettingsEditor } from "@/components/editor/site-settings-editor"
import { PlatformsEditor } from "@/components/editor/platforms-editor"
import { HeroEditor } from "@/components/editor/hero-editor"

export default function AdminBar() {
  const { editMode, toggleEditMode, saveChanges, isSaving } = useEditMode()
  const [showEditor, setShowEditor] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  if (!editMode) return null

  return (
    <AnimatePresence>
      {editMode && (
        <>
          {/* Bottom admin bar */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-[#3c294d] text-white z-50 shadow-lg"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">Edit Mode</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">Admin</span>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                    onClick={() => setShowEditor(true)}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Site
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={toggleEditMode}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>

                  <Button
                    size="sm"
                    className="bg-white text-[#3c294d] hover:bg-white/90"
                    onClick={saveChanges}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#3c294d]"
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
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Full editor panel */}
          <AnimatePresence>
            {showEditor && (
              <motion.div
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowEditor(false)}
              >
                <motion.div
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-[#3c294d] dark:text-white">Site Editor</h2>
                    <Button variant="ghost" size="icon" onClick={() => setShowEditor(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="p-0">
                    <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <div className="border-b border-gray-200 dark:border-gray-700">
                        <TabsList className="w-full justify-start rounded-none bg-transparent border-b-0 h-auto p-0">
                          <TabsTrigger
                            value="general"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#3c294d] data-[state=active]:bg-transparent data-[state=active]:text-[#3c294d] px-4 py-3"
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            General
                          </TabsTrigger>
                          <TabsTrigger
                            value="hero"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#3c294d] data-[state=active]:bg-transparent data-[state=active]:text-[#3c294d] px-4 py-3"
                          >
                            <Layout className="mr-2 h-4 w-4" />
                            Hero Section
                          </TabsTrigger>
                          <TabsTrigger
                            value="platforms"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#3c294d] data-[state=active]:bg-transparent data-[state=active]:text-[#3c294d] px-4 py-3"
                          >
                            <Globe className="mr-2 h-4 w-4" />
                            Platforms
                          </TabsTrigger>
                        </TabsList>
                      </div>

                      <div className="p-4 h-[70vh] overflow-y-auto">
                        <TabsContent value="general" className="mt-0">
                          <SiteSettingsEditor />
                        </TabsContent>

                        <TabsContent value="hero" className="mt-0">
                          <HeroEditor />
                        </TabsContent>

                        <TabsContent value="platforms" className="mt-0">
                          <PlatformsEditor />
                        </TabsContent>
                      </div>
                    </Tabs>
                  </div>

                  <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <Button variant="outline" className="mr-2" onClick={() => setShowEditor(false)}>
                      Cancel
                    </Button>

                    <Button
                      className="bg-[#3c294d] hover:bg-[#3c294d]/80"
                      onClick={async () => {
                        const success = await saveChanges()
                        if (success) setShowEditor(false)
                      }}
                      disabled={isSaving}
                    >
                      {isSaving ? (
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
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}

