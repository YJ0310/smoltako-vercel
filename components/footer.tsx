"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Instagram } from "lucide-react"
import { MagicText } from "@/components/ui/magic-text"
import { fadeIn, staggerContainer } from "@/utils/animation-variants"

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-12 mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={staggerContainer()}
          className="space-y-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div variants={fadeIn("right")} className="md:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-1fZgVyRDaNiKDdvGrwyQx5qOkoK8FG.png"
                  alt="Smol Tako Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <MagicText effect="gradient" as="span" className="text-xl font-bold">
                  Smol Tako
                </MagicText>
              </Link>
              <p className="text-muted-foreground mb-4 max-w-md">
                Bachelor of Science in Physics Year 2 at Faculty of Science, University of Malaya. Creating beautiful
                digital experiences with modern web technologies.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </motion.a>
              </div>
            </motion.div>

            <motion.div variants={fadeIn("up", 0.1)}>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/workspace" className="text-muted-foreground hover:text-primary transition-colors">
                    Personal Workspace
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#platforms" className="text-muted-foreground hover:text-primary transition-colors">
                    Platforms
                  </Link>
                </li>
                <li>
                  <Link href="#ai-tools" className="text-muted-foreground hover:text-primary transition-colors">
                    AI Tools
                  </Link>
                </li>
                <li>
                  <Link href="#um-resources" className="text-muted-foreground hover:text-primary transition-colors">
                    UM Resources
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={fadeIn("up", 0.2)}>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-muted-foreground">Sites: takoopro@smoltako.space</li>
                <li className="text-muted-foreground">Personal: yinjiasek@gmail.com</li>
                <li className="text-muted-foreground">+6013-4540120</li>
                <li className="text-muted-foreground">University of Malaya</li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            variants={fadeIn("up", 0.3)}
            className="border-t pt-8 flex flex-col md:flex-row justify-between items-center"
          >
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Sek Yin Jia. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
