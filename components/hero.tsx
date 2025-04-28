"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Dancing_Script } from "next/font/google"
import { MagicText } from "@/components/ui/magic-text"
import { MagicButton } from "@/components/ui/magic-button"
import { GlassCard } from "@/components/ui/glass-card"
import { fadeIn, floatAnimation, staggerContainer } from "@/utils/animation-variants"

// Load Google Fonts handwriting style font
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
})

export function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.5}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Text hover animation variants
  const textHoverVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      color: "var(--color-primary)",
      transition: { duration: 0.3 },
    },
  }

  // Quote hover animation variants
  const quoteHoverVariants = {
    initial: { opacity: 0.8, y: 0 },
    hover: {
      opacity: 1,
      y: -5,
      transition: { duration: 0.3 },
    },
  }

  return (
    <section ref={targetRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Parallax Background */}
      <div
        className="parallax-bg"
        style={{
          backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-OqTuau7xbgNsGQrvwxVrG4NTohSj5i.png)`,
        }}
        ref={parallaxRef}
      ></div>

      <motion.div
        className="container px-4 mx-auto relative z-10"
        variants={staggerContainer()}
        initial="hidden"
        animate="show"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeIn("right")} className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <motion.div initial="initial" whileHover="hover" variants={textHoverVariants} className="inline-block">
                <MagicText effect="gradient" as="span">
                  Smol Tako
                </MagicText>
              </motion.div>
              <br />
              <motion.div initial="initial" whileHover="hover" variants={textHoverVariants} className="inline-block">
                <MagicText
                  effect="shimmer"
                  as="span"
                  className={`text-3xl md:text-4xl lg:text-5xl ${dancingScript.className}`}
                  delay={0.3}
                >
                  Smol Action Big Changes
                </MagicText>
              </motion.div>
            </h1>
            <motion.div
              variants={fadeIn("up", 0.3)}
              className="text-lg md:text-xl mb-8 text-muted-foreground max-w-lg mx-auto lg:mx-0"
              initial="initial"
              whileHover="hover"
              variants={quoteHoverVariants}
            >
              <p className="transition-all duration-300 hover:text-primary">
                "规则就是用来打破的" - 开拓者
                <br />
                "Rules are made to be broken!" - Trailblazer
              </p>
            </motion.div>
            <motion.div
              variants={fadeIn("up", 0.5)}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a href="https://www.linkedin.com/in/yin-jia-sek-6b3955254/" target="_blank" rel="noopener noreferrer">
                <MagicButton effect="gradient">LinkedIn</MagicButton>
              </a>
              <a href="https://www.instagram.com/yjia_310/" target="_blank" rel="noopener noreferrer">
                <MagicButton effect="shine">Instagram</MagicButton>
              </a>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeIn("left", 0.2)} className="relative flex justify-center">
            <motion.div
              className="relative w-64 h-64 md:w-80 md:h-80"
              variants={floatAnimation}
              initial="initial"
              animate="animate"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-1fZgVyRDaNiKDdvGrwyQx5qOkoK8FG.png"
                alt="Smol Tako"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div style={{ opacity, y }} className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <GlassCard
            className="p-2 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <ArrowDown className="h-6 w-6 animate-bounce" />
          </GlassCard>
        </motion.div>
      </motion.div>
    </section>
  )
}
