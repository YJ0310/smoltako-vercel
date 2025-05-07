"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight } from "lucide-react"
import { MagicButton } from "@/components/ui/magic-button"
import { MagicText } from "@/components/ui/magic-text"
import { MagicCard } from "@/components/ui/magic-card"
import { fadeIn, staggerContainer } from "@/utils/animation-variants"

// Helper function to optimize image loading
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stopColor="#f6f7f8" offset="0%" />
      <stop stopColor="#edeef1" offset="20%" />
      <stop stopColor="#f6f7f8" offset="40%" />
      <stop stopColor="#f6f7f8" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlinkHref="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str)

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

  // Card gesture variants
  const cardVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
      transition: {
        type: "tween", // Change from spring to tween
        duration: 0.4,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.98,
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "tween",
        duration: 0.2,
      },
    },
    initial: {
      scale: 1,
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
    },
  }

  // Image animation variants
  const imageVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        type: "tween", // Use tween instead of spring for smoother animation
      },
    },
  }

  // Button animation variants
  const buttonVariants = {
    initial: { scale: 1, x: 0 },
    hover: {
      scale: 1.05,
      x: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  }

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer()}
      initial="hidden"
      animate={controls}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? "lg:flex-row-reverse" : ""}`}
    >
      <motion.div
        variants={fadeIn(isEven ? "right" : "left", 0.2)}
        className={`${isEven ? "lg:order-2" : ""}`}
        drag
        dragConstraints={{ left: -5, right: 5, top: -5, bottom: 5 }}
        dragElastic={0.1}
      >
        <motion.div initial="initial" whileHover="hover" whileTap="tap" variants={cardVariants}>
          <MagicCard effect={index % 2 === 0 ? "spotlight" : "border"}>
            <div className="relative overflow-hidden rounded-lg shadow-xl">
              <motion.div variants={imageVariants} initial="initial" whileHover="hover" className="overflow-hidden">
                <Image
                  src={platform.image || "/placeholder.svg"}
                  alt={platform.title}
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover transition-all duration-300"
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(800, 500))}`}
                  priority={index === 0} // Prioritize loading the first image
                />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-primary/10 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <MagicButton effect="gradient" asChild>
                  <a href={platform.link} target="_blank" rel="noopener noreferrer">
                    View Platform
                  </a>
                </MagicButton>
              </motion.div>
            </div>
          </MagicCard>
        </motion.div>
      </motion.div>

      <motion.div variants={fadeIn(isEven ? "left" : "right", 0.4)} className={`${isEven ? "lg:order-1" : ""}`}>
        <MagicText effect="gradient" as="h3" className="text-2xl md:text-3xl font-bold mb-4">
          {platform.title}
        </MagicText>
        <p className="text-lg text-muted-foreground mb-6">{platform.description}</p>
        <motion.div initial="initial" whileHover="hover" whileTap="tap" variants={buttonVariants}>
          <MagicButton effect="shine" asChild>
            <a href={platform.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
              Visit Site{" "}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </MagicButton>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
