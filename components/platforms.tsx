"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight } from "lucide-react"
import { MagicText } from "@/components/ui/magic-text"
import { fadeIn, staggerContainer } from "@/utils/animation-variants"

const platforms = [
  {
    id: 1,
    title: "Smol Tako Moodle",
    description:
      "Smol Tako Moodle - A comprehensive learning management system with interactive courses, assessments, and progress tracking.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smol%20takoo%20moodle-PHJ4KkgaoX0zzXl2qk6hOkI8niqfna.png",
    link: "https://class.smoltako.space",
  },
  {
    id: 2,
    title: "UM Course Year 2 Semester 2",
    description:
      "UM Course Year 2 Semester 2 - Organize and manage your academic schedule with our intuitive calendar and task management system.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Year%202%20Semester%202%20UM%20Courses-RzKPGDj6LVu2SAWpZifqFwg9ksghdD.png",
    link: "https://y2s2.smoltako.space",
  },
  {
    id: 3,
    title: "Wix Sites",
    description:
      "Wix Sites - Access a suite of web tools and services designed to enhance your online presence and productivity.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wix%20sites-2jx4X7kAtx9ZKC3n1NjGgwhPYroXqL.png",
    link: "https://home.smoltako.space",
  },
  {
    id: 4,
    title: "Cloudflare Dashboard",
    description: "Cloudflare Dashboard - Manage your domains, DNS settings, and website security all in one place.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cloudflare-y0bjcllYO3g0aDNLSuA3h5lqxtYPuH.png",
    link: "https://cloudflare.smoltako.space",
  },
  {
    id: 5,
    title: "My Google Sites",
    description: "Google Sites - Create and manage simple websites with Google's easy-to-use website builder.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/google%20sites-sJqYJoFMzfugRurIPipOooRCAEge8Z.png",
    link: "https://0.smoltako.space",
  },
  {
    id: 6,
    title: "Vercel Edit Dashboard",
    description: "Vercel Edit Dashboard - Develop and deploy web applications with Vercel's powerful platform.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vercel%20edit%20dashboard-vPKgoU3m7qKfVHdPZdZ2YjjfASYvbr.png",
    link: "https://v0.dev/chat/enhanced-portfolio-website-071PW7MqVmx",
  },
]

export function Platforms() {
  return (
    <section id="platforms" className="py-20 md:py-32 bg-secondary/50 relative overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <MagicText effect="gradient" as="h2" className="text-3xl md:text-4xl font-bold mb-6">
            Platforms
          </MagicText>
          <p className="text-lg text-muted-foreground">
            Explore the various platforms I've developed to serve different needs and purposes.
          </p>
        </div>

        <div className="space-y-32">
          {platforms.map((platform, index) => (
            <PlatformItem key={platform.id} platform={platform} isEven={index % 2 === 1} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PlatformItem({
  platform,
  isEven,
  index,
}: {
  platform: {
    id: number
    title: string
    description: string
    image: string
    link: string
  }
  isEven: boolean
  index: number
}) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start("show")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer()}
      initial="hidden"
      animate={controls}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? "lg:flex-row-reverse" : ""}`}
    >
      <motion.div variants={fadeIn(isEven ? "right" : "left", 0.2)} className={`${isEven ? "lg:order-2" : ""}`}>
        <div className="relative overflow-hidden rounded-lg shadow-xl transform-gpu">
          {/* Image container */}
          <div className="relative overflow-hidden">
            <Image
              src={platform.image || "/placeholder.svg"}
              alt={platform.title}
              width={800}
              height={500}
              className="w-full h-auto object-cover transition-transform duration-500 ease-out hover:scale-105"
              priority={index < 2} // Prioritize loading the first two images
            />

            {/* Overlay with button - CSS only approach */}
            <div className="absolute inset-0 bg-primary/30 backdrop-blur-[2px] opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <a
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-full transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
              >
                View Platform
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeIn(isEven ? "left" : "right", 0.4)} className={`${isEven ? "lg:order-1" : ""}`}>
        <MagicText effect="gradient" as="h3" className="text-2xl md:text-3xl font-bold mb-4">
          {platform.title}
        </MagicText>
        <p className="text-lg text-muted-foreground mb-6">{platform.description}</p>
        <a
          href={platform.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-full transition-all duration-300 hover:translate-x-1"
        >
          Visit Site <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </motion.div>
    </motion.div>
  )
}
