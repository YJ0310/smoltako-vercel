"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ModeToggle } from "@/components/mode-toggle"
import { MagicButton } from "@/components/ui/magic-button"
import { GlassCard } from "@/components/ui/glass-card"
import { MagicCard } from "@/components/ui/magic-card"
import { InteractiveImage } from "@/components/ui/interactive-image"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [platformsDropdownOpen, setPlatformsDropdownOpen] = useState(false)
  const [aiToolsDropdownOpen, setAiToolsDropdownOpen] = useState(false)
  const [umResourcesDropdownOpen, setUmResourcesDropdownOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)

      // Update active section based on scroll position
      const sections = ["about", "platforms", "ai-tools", "um-resources", "illustrations", "contact"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }

      // If we're at the top, set active to home
      if (window.scrollY < 100) {
        setActiveSection("home")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "#about", label: "About" },
    {
      href: "#platforms",
      label: "Platforms",
      hasDropdown: true,
      dropdownItems: [
        { href: "https://class.smoltako.space", label: "Smol Tako Moodle" },
        { href: "https://y2s2.smoltako.space", label: "UM Course Y2S2" },
        { href: "https://home.smoltako.space", label: "Wix Sites" },
        { href: "https://cloudflare.smoltako.space", label: "Cloudflare Dashboard" },
        { href: "https://0.smoltako.space", label: "Google Sites" },
        { href: "https://v0.dev/chat/enhanced-portfolio-website-071PW7MqVmx", label: "V0" },
      ],
      isOpen: platformsDropdownOpen,
      setIsOpen: setPlatformsDropdownOpen,
    },
    {
      href: "#ai-tools",
      label: "AI Tools",
      hasDropdown: true,
      dropdownItems: [
        { href: "https://chat.deepseek.com", label: "DeepSeek Chat" },
        { href: "https://perplexity.ai", label: "Perplexity AI" },
        { href: "https://aistudio.google.com/", label: "Gemini Studio" },
        { href: "https://latentbox.com", label: "Latent Box" },
        { href: "https://gemini.google.com", label: "Google Gemini" },
        { href: "https://claude.ai", label: "Claude AI" },
        { href: "https://chat.openai.com", label: "ChatGPT" },
      ],
      isOpen: aiToolsDropdownOpen,
      setIsOpen: setAiToolsDropdownOpen,
    },
    {
      href: "#um-resources",
      label: "UM Resources",
      hasDropdown: true,
      dropdownItems: [
        { href: "https://spectrum.um.edu.my/", label: "Spectrum" },
        { href: "https://maya.um.edu.my/sitsvision/wrd/SIW_LGN", label: "MAYA" },
        { href: "https://mysis.um.edu.my/", label: "MYSIS" },
        { href: "https://helpdesk.um.edu.my/", label: "Helpdesk" },
      ],
      isOpen: umResourcesDropdownOpen,
      setIsOpen: setUmResourcesDropdownOpen,
    },
    { href: "#illustrations", label: "Illustrations" },
    { href: "#contact", label: "Contact" },
  ]

  const handleDropdownToggle = (setDropdownState: React.Dispatch<React.SetStateAction<boolean>>, href: string) => {
    // Navigate to the section
    const sectionId = href.substring(1)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })

    // Toggle the dropdown
    // Close all other dropdowns first
    if (setDropdownState !== setPlatformsDropdownOpen) setPlatformsDropdownOpen(false)
    if (setDropdownState !== setUmResourcesDropdownOpen) setUmResourcesDropdownOpen(false)
    if (setDropdownState !== setAiToolsDropdownOpen) setAiToolsDropdownOpen(false)

    // Toggle the current dropdown
    setDropdownState((prev) => !prev)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <InteractiveImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-1fZgVyRDaNiKDdvGrwyQx5qOkoK8FG.png"
            alt="Smol Tako Logo"
            width={40}
            height={40}
            className="rounded-full"
            effect="rotate"
          />
          <span className="text-xl font-bold">Smol Tako</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <div key={item.href} className="relative">
              {item.hasDropdown ? (
                <>
                  <motion.button
                    className={`text-sm font-medium transition-colors relative flex items-center ${
                      activeSection === item.href.substring(1) ? "text-primary" : "hover:text-primary"
                    }`}
                    onClick={() => handleDropdownToggle(item.setIsOpen, item.href)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${item.isOpen ? "rotate-180" : ""}`} />
                    {activeSection === item.href.substring(1) && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      />
                    )}
                  </motion.button>
                  <AnimatePresence>
                    {item.isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 z-50"
                      >
                        <MagicCard
                          effect="spotlight"
                          className="p-2 bg-background/90 backdrop-blur-md shadow-lg rounded-lg border border-border"
                        >
                          <div className="py-1">
                            {item.dropdownItems.map((dropdownItem, idx) => (
                              <motion.a
                                key={idx}
                                href={dropdownItem.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2 text-sm hover:bg-primary/10 rounded-md transition-colors"
                                onClick={() => item.setIsOpen(false)}
                                whileHover={{ x: 5, backgroundColor: "rgba(124, 58, 237, 0.1)" }}
                                whileTap={{ scale: 0.98 }}
                              >
                                {dropdownItem.label}
                              </motion.a>
                            ))}
                          </div>
                        </MagicCard>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors relative ${
                      activeSection === item.href.substring(1) ? "text-primary" : "hover:text-primary"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.href.substring(1) && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      />
                    )}
                  </Link>
                </motion.div>
              )}
            </div>
          ))}
          <ModeToggle />
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden space-x-4">
          <ModeToggle />
          <GlassCard
            className="p-2 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </GlassCard>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-md"
          >
            <div className="container px-4 py-4 mx-auto">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.hasDropdown ? (
                      <div className="space-y-2">
                        <motion.button
                          className={`text-sm font-medium transition-colors flex items-center justify-between w-full py-2 ${
                            activeSection === item.href.substring(1) ? "text-primary" : ""
                          }`}
                          onClick={() => handleDropdownToggle(item.setIsOpen, item.href)}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>{item.label}</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${item.isOpen ? "rotate-180" : ""}`} />
                        </motion.button>
                        <AnimatePresence>
                          {item.isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4 space-y-2 border-l-2 border-primary/20"
                            >
                              {item.dropdownItems.map((dropdownItem, idx) => (
                                <motion.a
                                  key={idx}
                                  href={dropdownItem.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                  onClick={() => {
                                    item.setIsOpen(false)
                                    setIsOpen(false)
                                  }}
                                  whileHover={{ x: 5, color: "hsl(var(--primary))" }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  {dropdownItem.label}
                                </motion.a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <motion.div whileTap={{ scale: 0.95 }}>
                        <Link
                          href={item.href}
                          className={`text-sm font-medium transition-colors hover:text-primary py-2 block ${
                            activeSection === item.href.substring(1) ? "text-primary" : ""
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  <MagicButton effect="gradient" onClick={() => setIsOpen(false)}>
                    Get in Touch
                  </MagicButton>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
