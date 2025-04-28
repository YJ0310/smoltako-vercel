"use client"

import { motion } from "framer-motion"
import { Mail, Folder, FlaskRoundIcon as Flask, Calculator, ExternalLink } from "lucide-react"

interface LinkCardProps {
  title: string
  description: string
  href: string
  icon: string
}

export function LinkCard({ title, description, href, icon }: LinkCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "mail":
        return <Mail className="h-5 w-5" />
      case "folder":
        return <Folder className="h-5 w-5" />
      case "flask":
        return <Flask className="h-5 w-5" />
      case "calculator":
        return <Calculator className="h-5 w-5" />
      default:
        return <ExternalLink className="h-5 w-5" />
    }
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="block group"
    >
      <div className="relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-start gap-4">
          <div className="rounded-full p-2 bg-primary/10 text-primary">{getIcon(icon)}</div>
          <div className="space-y-1">
            <h3 className="font-medium leading-none group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </motion.a>
  )
}
