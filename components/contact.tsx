"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Briefcase, GraduationCap, CheckCircle, AlertCircle } from "lucide-react"
import { MagicButton } from "@/components/ui/magic-button"
import { MagicText } from "@/components/ui/magic-text"
import { MagicCard } from "@/components/ui/magic-card"
import { fadeIn, staggerContainer } from "@/utils/animation-variants"

export function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Send data to our API route
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "39f24676-cca4-4622-81aa-4c87c6e80973",
          name: e.target.name.value,
          email: e.target.email.value,
          message: e.target.message.value,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message. Please try again later.")
      }

      // Success
      setIsSubmitted(true)
      setName("")
      setEmail("")
      setMessage("")

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")

      // Reset error message after 5 seconds
      setTimeout(() => {
        setError(null)
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Card animation variants
  const cardVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    tap: {
      scale: 0.98,
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    },
    initial: {
      scale: 1,
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
    },
  }

  // Icon animation variants
  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5,
      },
    },
  }

  // Input animation variants
  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 2px rgba(124, 58, 237, 0.5)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
    initial: {
      scale: 1,
      boxShadow: "none",
    },
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="container px-4 mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={staggerContainer()}
          className="space-y-16"
        >
          <motion.div variants={fadeIn("up")} className="text-center max-w-3xl mx-auto">
            <MagicText effect="gradient" as="h2" className="text-3xl md:text-4xl font-bold mb-6">
              Get in Touch
            </MagicText>
            <p className="text-lg text-muted-foreground">
              Have a project in mind or want to collaborate? Feel free to reach out and I'll get back to you as soon as
              possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div variants={fadeIn("right")} className="space-y-8">
              <motion.div initial="initial" whileHover="hover" whileTap="tap" variants={cardVariants}>
                <MagicCard effect="spotlight" className="p-6" intensity="medium">
                  <h3 className="text-2xl font-semibold mb-6">About Me</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
                        variants={iconVariants}
                      >
                        <GraduationCap className="h-5 w-5 text-primary" />
                      </motion.div>
                      <div>
                        <h4 className="text-base font-medium">Sek Yin Jia</h4>
                        <p className="text-muted-foreground">Bachelor of Science in Physics Year 2</p>
                        <p className="text-muted-foreground">Faculty of Science University of Malaya</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <motion.div
                        className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
                        variants={iconVariants}
                      >
                        <Briefcase className="h-5 w-5 text-primary" />
                      </motion.div>
                      <div>
                        <h4 className="text-base font-medium">Positions</h4>
                        <p className="text-muted-foreground text-sm">
                          Academic Executives | Department of Academic | University of Malaya Student Union Faculty of
                          Science 2023/2024
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Student Body Officer | Finance Office | University of Malaya Student Union 2024/2025
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Media Officer | Presidential Office | University of Malaya Student Union 2024/2025
                        </p>
                      </div>
                    </div>
                  </div>
                </MagicCard>
              </motion.div>

              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <motion.div initial="initial" whileHover="hover" whileTap="tap" variants={cardVariants}>
                  <MagicCard effect="border" className="p-4">
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
                        variants={iconVariants}
                      >
                        <Mail className="h-5 w-5 text-primary" />
                      </motion.div>
                      <div>
                        <h4 className="text-base font-medium">Email</h4>
                        <p className="text-muted-foreground">Sites: sites.support@smoltako.space</p>
                        <p className="text-muted-foreground">Personal: yinjiasek@gmail.com</p>
                      </div>
                    </div>
                  </MagicCard>
                </motion.div>

                <motion.div initial="initial" whileHover="hover" whileTap="tap" variants={cardVariants}>
                  <MagicCard effect="border" className="p-4">
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
                        variants={iconVariants}
                      >
                        <Phone className="h-5 w-5 text-primary" />
                      </motion.div>
                      <div>
                        <h4 className="text-base font-medium">Phone</h4>
                        <p className="text-muted-foreground">+6013-4540120</p>
                      </div>
                    </div>
                  </MagicCard>
                </motion.div>

                <motion.div initial="initial" whileHover="hover" whileTap="tap" variants={cardVariants}>
                  <MagicCard effect="border" className="p-4">
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
                        variants={iconVariants}
                      >
                        <MapPin className="h-5 w-5 text-primary" />
                      </motion.div>
                      <div>
                        <h4 className="text-base font-medium">Location</h4>
                        <p className="text-muted-foreground">University of Malaya</p>
                      </div>
                    </div>
                  </MagicCard>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn("left")}>
              <MagicCard
                effect="spotlight"
                className="p-6 md:p-8"
                intensity="light"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)" }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

                {/* Success message */}
                {isSubmitted && (
                  <motion.div
                    className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-4 rounded-md mb-6 flex items-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>Thank you for your message! I'll get back to you soon.</span>
                  </motion.div>
                )}

                {/* Error message */}
                {error && (
                  <motion.div
                    className="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-4 rounded-md mb-6 flex items-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <motion.div initial="initial" whileFocus="focus" variants={inputVariants}>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required
                        className="bg-background/50 backdrop-blur-sm"
                      />
                    </motion.div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <motion.div initial="initial" whileFocus="focus" variants={inputVariants}>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        required
                        className="bg-background/50 backdrop-blur-sm"
                      />
                    </motion.div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <motion.div initial="initial" whileFocus="focus" variants={inputVariants}>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Your message"
                        rows={5}
                        required
                        className="bg-background/50 backdrop-blur-sm"
                      />
                    </motion.div>
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <MagicButton type="submit" effect="gradient" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2 h-4 w-4" /> Send Message
                        </span>
                      )}
                    </MagicButton>
                  </motion.div>
                </form>
              </MagicCard>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
