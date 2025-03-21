"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { useRef } from "react"
import { useInView } from "react-intersection-observer"
import { useEditMode } from "@/hooks/use-edit-mode"
import siteConfig from "@/lib/site-config"

export default function Home() {
  // All hooks must be called at the top level
  const { scrollY } = useScroll()
  const heroRef = useRef(null)
  const platformsRef = useRef(null)
  const { siteConfig: editableSiteConfig, isLoading } = useEditMode()

  const config = editableSiteConfig || siteConfig

  const [platformsInViewRef, platformsInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  // Move all useTransform calls to the top level
  const heroY = useTransform(scrollY, [0, 500], [0, -100])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.5])
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -100])

  // Render content based on loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#3c294d] border-[#3c294d]/30 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#3c294d]">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3c294d]/20 to-[#3c294d]/5 pointer-events-none z-0"></div>

      {/* Hero section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 z-10">
          <motion.div
            className="grid md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex justify-center md:justify-end order-2 md:order-1"
              style={{ y: heroY, opacity: heroOpacity }}
            >
              <div className="relative">
                <motion.div
                  className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/10 shadow-lg relative z-10"
                  initial={{ scale: 0.8, rotate: -5 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    delay: 0.2,
                    duration: 0.8,
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 5,
                    transition: { duration: 0.3 },
                  }}
                >
                  <Image
                    src="/images/logo.png"
                    alt="Smol Tako"
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                    priority
                  />
                </motion.div>
                <motion.div
                  className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[#3c294d]/30 blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6 text-[#3c294d]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {config.heroTitle}
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {config.heroSubtitle}
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Button asChild className="bg-[#3c294d] hover:bg-[#3c294d]/80">
                  <Link href="/about">About Me</Link>
                </Button>
                <Button asChild variant="outline" className="border-[#3c294d] text-[#3c294d] hover:bg-[#3c294d]/10">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-[#3c294d]/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-[#3c294d]/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </section>

      {/* Platforms section */}
      <section ref={platformsRef} className="py-24 relative">
        <div ref={platformsInViewRef} className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={platformsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#3c294d]">My Platforms</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore my digital ecosystem through these specialized platforms
            </p>
          </motion.div>

          <div className="space-y-32">
            {config.platforms
              .filter((platform) => platform.featured)
              .sort((a, b) => a.order - b.order)
              .map((platform, index) => (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, y: 60 }}
                  animate={platformsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-16`}
                >
                  <div className="w-full md:w-1/2">
                    <motion.div
                      className="relative overflow-hidden rounded-2xl shadow-xl"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={platform.image || "/placeholder.svg"}
                        alt={platform.name}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3c294d]/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-8">
                          <Button asChild className="bg-white text-[#3c294d] hover:bg-white/90">
                            <a
                              href={platform.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center"
                            >
                              Visit Site <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="w-full md:w-1/2">
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                      animate={platformsInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                    >
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#3c294d]">{platform.name}</h3>
                      <p className="text-lg text-gray-600 mb-6">{platform.description}</p>
                      <Button asChild className="bg-[#3c294d] hover:bg-[#3c294d]/80">
                        <a href={platform.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                          Explore <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* About this website section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center relative z-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#3c294d]">About This Website</h2>
            <p className="text-lg text-gray-600 mb-8">{config.aboutText}</p>
            <motion.div className="mt-12" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Card className="p-8 bg-gradient-to-br from-[#3c294d] to-[#3c294d]/80 text-white">
                <p className="text-xl font-medium">Ready to collaborate?</p>
                <p className="mb-6">Let's create something amazing together</p>
                <Button asChild className="bg-white text-[#3c294d] hover:bg-white/90">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Background image with parallax effect */}
        <motion.div
          className="absolute bottom-0 right-0 w-full md:w-1/3 h-full opacity-10 pointer-events-none"
          style={{ y: backgroundY }}
        >
          <Image src="/images/background.png" alt="Background" fill className="object-contain object-bottom" />
        </motion.div>
      </section>
    </main>
  )
}

