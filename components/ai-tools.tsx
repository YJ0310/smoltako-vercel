"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ExternalLink, Bot, Sparkles, Brain, Lightbulb, Zap, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MagicCard } from "@/components/ui/magic-card"
import { MagicText } from "@/components/ui/magic-text"
import { fadeIn, staggerContainer } from "@/utils/animation-variants"

const aiTools = [
  {
    id: 1,
    name: "Gemini",
    icon: <Sparkles className="h-5 w-5" />,
    url: "https://gemini.google.com",
  },
  {
    id: 2,
    name: "Grok",
    icon: <Zap className="h-5 w-5" />,
    url: "https://grok.com",
  },
  {
    id: 3,
    name: "Claude",
    icon: <Brain className="h-5 w-5" />,
    url: "https://claude.ai",
  },
  {
    id: 4,
    name: "ChatDeepSeek",
    icon: <Bot className="h-5 w-5" />,
    url: "https://chat.deepseek.com",
  },
  {
    id: 5,
    name: "Gemini Studio",
    icon: <Code className="h-5 w-5" />,
    url: "https://aistudio.google.com/",
  },
  {
    id: 6,
    name: "Perplexity",
    icon: <Lightbulb className="h-5 w-5" />,
    url: "https://perplexity.ai",
  },
  {
    id: 7,
    name: "ChatGPT",
    icon: <Sparkles className="h-5 w-5" />,
    url: "https://chat.openai.com",
  },
]

export function AiTools() {
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
    hover: {
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="ai-tools" className="py-20 bg-background relative overflow-hidden">
      <div className="container px-4 mx-auto">
        <motion.div ref={ref} variants={staggerContainer()} initial="hidden" animate={controls} className="space-y-16">
          <motion.div variants={fadeIn("up")} className="text-center max-w-3xl mx-auto">
            <MagicText effect="gradient" as="h2" className="text-3xl md:text-4xl font-bold mb-6">
              AI Tools
            </MagicText>
            <p className="text-lg text-muted-foreground">
              A collection of powerful AI tools that I use for research, content creation, and problem-solving.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                variants={fadeIn("up", index * 0.1)}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.1}
                whileDrag={{ scale: 1.02, opacity: 0.9 }}
              >
                <motion.div initial="initial" whileHover="hover" whileTap="tap" variants={cardVariants}>
                  <MagicCard effect="spotlight" className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
                          variants={iconVariants}
                        >
                          {tool.icon}
                        </motion.div>
                        <h3 className="text-lg font-medium">{tool.name}</h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="hover:bg-primary/10 transition-colors duration-300"
                      >
                        <a href={tool.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">Visit {tool.name}</span>
                        </a>
                      </Button>
                    </div>
                  </MagicCard>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
