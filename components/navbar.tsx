"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Moon, Sun, Edit } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { useEditMode } from "@/hooks/use-edit-mode"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { editMode, toggleEditMode } = useEditMode()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Me", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <motion.header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white/80 dark:bg-[#1a1625]/80 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}>
              <Image src="/images/logo.png" alt="Smol Tako" width={40} height={40} className="rounded-full" />
            </motion.div>
            <span className="text-xl font-bold text-[#3c294d] dark:text-white">Smol Tako</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-gray-600 dark:text-gray-300 hover:text-[#3c294d] dark:hover:text-white transition-colors relative group",
                  pathname === link.href && "text-[#3c294d] dark:text-white font-medium",
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-[#3c294d] dark:bg-white transition-all duration-300 group-hover:w-full",
                    pathname === link.href && "w-full",
                  )}
                ></span>
              </Link>
            ))}

            <div className="flex items-center space-x-4 pl-4 border-l border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-gray-600 dark:text-gray-300 hover:text-[#3c294d] dark:hover:text-white"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                  </motion.div>
                </AnimatePresence>
              </button>

              {/* Admin Edit Mode Toggle */}
              <div className="flex items-center space-x-2">
                <Switch
                  checked={editMode}
                  onCheckedChange={toggleEditMode}
                  className="data-[state=checked]:bg-[#3c294d]"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">{editMode ? <Edit size={16} /> : null}</span>
              </div>

              <Button
                asChild
                className="bg-[#3c294d] hover:bg-[#3c294d]/80 dark:bg-[#3c294d]/90 dark:hover:bg-[#3c294d]"
              >
                <a href="https://class.smoltako.space" target="_blank" rel="noopener noreferrer">
                  Moodle
                </a>
              </Button>
            </div>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-gray-600 dark:text-gray-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              className="text-[#3c294d] dark:text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-[#1a1625] shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-gray-600 dark:text-gray-300 hover:text-[#3c294d] dark:hover:text-white py-2 transition-colors",
                    pathname === link.href && "text-[#3c294d] dark:text-white font-medium",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Admin Edit Mode Toggle (Mobile) */}
              <div className="flex items-center justify-between py-2 border-t border-gray-100 dark:border-gray-800">
                <span className="text-gray-600 dark:text-gray-300">Edit Mode</span>
                <Switch
                  checked={editMode}
                  onCheckedChange={toggleEditMode}
                  className="data-[state=checked]:bg-[#3c294d]"
                />
              </div>

              <Button
                asChild
                className="bg-[#3c294d] hover:bg-[#3c294d]/80 dark:bg-[#3c294d]/90 dark:hover:bg-[#3c294d] w-full"
              >
                <a href="https://class.smoltako.space" target="_blank" rel="noopener noreferrer">
                  Moodle
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

