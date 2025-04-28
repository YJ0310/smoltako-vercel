"use client"

import { motion } from "framer-motion"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-6 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-sm text-muted-foreground">&copy; {currentYear} Sek Yin Jia. All rights reserved.</p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">我的工作室 - My Workspace</p>
        </motion.div>
      </div>
    </footer>
  )
}
