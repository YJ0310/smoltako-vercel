"use client"

import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { useEditMode } from "@/hooks/use-edit-mode"
import siteConfig from "@/lib/site-config"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { siteConfig: editableSiteConfig } = useEditMode()

  const config = editableSiteConfig || siteConfig

  return (
    <footer className="bg-[#3c294d]/5 dark:bg-[#1a1625] py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <Image src="/images/logo.png" alt="Smol Tako" width={40} height={40} className="rounded-full" />
              <span className="text-xl font-bold text-[#3c294d] dark:text-white">{config.siteName}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{config.siteDescription}</p>
            <div className="flex space-x-4">
              <motion.a
                href={config.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-[#3c294d] dark:hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a
                href={config.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-[#3c294d] dark:hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a
                href={config.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-[#3c294d] dark:hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a
                href={`mailto:${config.contactEmail}`}
                className="text-gray-600 dark:text-gray-300 hover:text-[#3c294d] dark:hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-[#3c294d] dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#3c294d] dark:hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#3c294d] dark:hover:text-white transition-colors"
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#3c294d] dark:hover:text-white transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#3c294d] dark:hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-[#3c294d] dark:text-white">Platforms</h3>
            <ul className="space-y-2">
              {config.platforms.slice(0, 4).map((platform) => (
                <li key={platform.id}>
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-[#3c294d] dark:hover:text-white transition-colors"
                  >
                    {platform.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-[#3c294d]/10 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            © {currentYear} {config.siteName}. All rights reserved.
          </p>

          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#3c294d] dark:hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#3c294d] dark:hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Image src="/images/logo.png" alt="Smol Tako" width={60} height={60} className="rounded-full opacity-70" />
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#3c294d]/5 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-[#3c294d]/5 blur-3xl"></div>
      </div>
    </footer>
  )
}

