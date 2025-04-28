"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Ticker } from "@/components/ui/ticker"
import { MagicText } from "@/components/ui/magic-text"
import { MagicCard } from "@/components/ui/magic-card"
import { fadeIn, staggerContainer } from "@/utils/animation-variants"

const illustrations = [
  {
    id: 1,
    title: "Bar Scene",
    description: "Character enjoying a drink at a stylish bar",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/My%20Illustration%20%281%29.TIF-2yiWzc3ShIubUPTSYUzbUumo1TpRWC.jpeg",
    aspectRatio: 0.75, // 3:4
  },
  {
    id: 2,
    title: "Pink Thoughts",
    description: "Character with pink hair in a thoughtful pose",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/My%20Illustration%20%281%29.jpg-NAZT7kEfaedgKEJssxvsnbnfJhrX7r.jpeg",
    aspectRatio: 1.43, // 10:7
  },
  {
    id: 3,
    title: "Scenic View",
    description: "Character enjoying a beautiful lake view",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/My%20Illustration%20%287%29.PNG-x3anJyLNg2iG5luToQnnZoUq2eWv8E.jpeg",
    aspectRatio: 0.78, // 7:9
  },
  {
    id: 4,
    title: "Selfie with Teddy",
    description: "Character taking a selfie with a cute teddy bear",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/My%20Illustration%20%282%29.PNG-Dk9Ik8uFk4bTHzdyB14EChLS70nJOI.jpeg",
    aspectRatio: 0.64, // 16:25
  },
  {
    id: 5,
    title: "Night Lights",
    description: "Character in a night scene with beautiful lighting",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/My%20Illustration%20%281%29.PNG-mgD7gWPYK8B0qnmG6K2SkF1aC9DiFo.jpeg",
    aspectRatio: 1.5, // 3:2
  },
  {
    id: 6,
    title: "Cherry Blossom Selfie",
    description: "Character taking a selfie with cherry blossoms",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/My%20Illustration%20%285%29.PNG-098mKkXOGhjWPTnihGuE0Dt38L6TEk.png",
    aspectRatio: 1, // 1:1
  },
  {
    id: 7,
    title: "Study Time",
    description: "Character surrounded by books and study materials",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/My%20Illustration%20%282%29.jpg-9QXbUAH3IMx9wm0mwAzNDTPEJGpGbP.jpeg",
    aspectRatio: 1.56, // 25:16
  },
  {
    id: 8,
    title: "Fan and Petals",
    description: "Character with a red fan and cherry blossom petals",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/My%20Illustration%20%286%29.PNG-DYGbsWyKByZ1E9bqR9nl02RFxTrDU3.png",
    aspectRatio: 0.88, // 7:8
  },
  {
    id: 9,
    title: "Kawaii Style",
    description: "Character in a cute kawaii style with blue apron",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/My%20Illustration%20%283%29.png-bUZ7tG7Aaz8UOuE8BdPdgM8OeXB6Tj.jpeg",
    aspectRatio: 1.14, // 8:7
  },
]

// Split illustrations into two rows
const firstRowIllustrations = illustrations.slice(0, Math.ceil(illustrations.length / 2))
const secondRowIllustrations = illustrations.slice(Math.ceil(illustrations.length / 2))

// Standard height for all images
const STANDARD_HEIGHT = 300

// Simple Image component with hover effects
function SimpleImage({ src, alt, aspectRatio = 1, className = "" }) {
  // Calculate width based on aspect ratio and standard height
  const width = Math.round(STANDARD_HEIGHT * aspectRatio)

  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg shadow-md ${className}`}
      style={{ height: STANDARD_HEIGHT, width }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
        zIndex: 10,
      }}
      transition={{ duration: 0.3 }}
    >
      <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover transition-all duration-300" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export function Illustrations() {
  const controls = useAnimation()
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start("show")
    }
  }, [controls, inView])

  return (
    <section id="illustrations" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="container px-4 mx-auto">
        <motion.div ref={ref} variants={staggerContainer()} initial="hidden" animate={controls} className="space-y-16">
          <motion.div variants={fadeIn("up")} className="text-center max-w-3xl mx-auto mb-16">
            <MagicText effect="gradient" as="h2" className="text-3xl md:text-4xl font-bold mb-6">
              My Illustrations
            </MagicText>
            <p className="text-lg text-muted-foreground">
              A collection of my digital artwork and character illustrations showcasing my creative style.
            </p>
          </motion.div>

          <motion.div variants={fadeIn("up", 0.2)} className="mb-16 space-y-16">
            {/* First row ticker - moving right */}
            <Ticker direction="right" speed={25} className="py-4">
              {firstRowIllustrations.map((illus) => (
                <div key={`first-row-${illus.id}`} className="mx-4">
                  <SimpleImage src={illus.image} alt={illus.title} aspectRatio={illus.aspectRatio} />
                </div>
              ))}
            </Ticker>

            {/* Second row ticker - moving left */}
            <Ticker direction="left" speed={25} className="py-4">
              {secondRowIllustrations.map((illus) => (
                <div key={`second-row-${illus.id}`} className="mx-4">
                  <SimpleImage src={illus.image} alt={illus.title} aspectRatio={illus.aspectRatio} />
                </div>
              ))}
            </Ticker>
          </motion.div>

          <motion.div variants={fadeIn("up", 0.4)} className="text-center">
            <MagicCard
              effect="spotlight"
              className="p-6 max-w-2xl mx-auto"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)" }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-xl font-semibold mb-4">About My Artwork</h3>
              <p className="text-muted-foreground">
                These illustrations represent my passion for digital art and character design. Each piece is carefully
                crafted to convey emotion and tell a story through visual elements. I draw inspiration from anime,
                manga, and modern digital art styles.
              </p>
            </MagicCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
