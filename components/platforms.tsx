"use client"

import { useEffect, useState } from "react"
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

// Loading skeleton component
function ImageSkeleton() {
  return (
    <div className="w-full h-[500px] bg-gradient-to-r from-muted via-muted/50 to-muted animate-shimmer bg-[length:400%_100%] rounded-lg">
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-sm text-muted-foreground animate-pulse">Loading platform preview...</p>
        </div>
      </div>
    </div>
  )
}

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
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (inView) {
      controls.start("show")
    }
  }, [controls, inView])

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(true) // Hide loading indicator even on error
  }

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
          {/* Loading indicator */}
          {!imageLoaded && (
            <div className="absolute inset-0 z-10">
              <ImageSkeleton />
            </div>
          )}

          {/* Image container */}
          <div
            className={`relative overflow-hidden transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          >
            {imageError ? (
              // Error state
              <div className="w-full h-[500px] bg-muted flex items-center justify-center rounded-lg">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 mx-auto bg-muted-foreground/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-muted-foreground">Failed to load image</p>
                  <a
                    href={platform.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-primary hover:text-primary/80 text-sm underline"
                  >
                    Visit platform directly
                  </a>
                </div>
              </div>
            ) : (
              <Image
                src={platform.image || "/placeholder.svg"}
                alt={platform.title}
                width={800}
                height={500}
                className="w-full h-auto object-cover transition-transform duration-500 ease-out hover:scale-105"
                priority={index < 2} // Prioritize loading the first two images
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )}

            {/* Overlay with button - only show when image is loaded */}
            {imageLoaded && !imageError && (
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
            )}
          </div>

          {/* Loading progress indicator */}
          {!imageLoaded && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
              <div className="h-full bg-primary animate-loading-bar"></div>
            </div>
          )}
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
