"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ExternalLink, BookOpen, Calendar, User, HelpCircle, Search } from "lucide-react"
import { MagicCard } from "@/components/ui/magic-card"
import { MagicText } from "@/components/ui/magic-text"
import { AnimatedButton } from "@/components/ui/animated-button"
import { fadeIn, staggerContainer } from "@/utils/animation-variants"

const umResources = [
  {
    id: 1,
    name: "Spectrum",
    url: "https://spectrum.um.edu.my/",
    icon: <BookOpen className="h-5 w-5" />,
    description: "UM's e-learning platform for course materials and assignments",
  },
  {
    id: 2,
    name: "MAYA",
    url: "https://maya.um.edu.my/sitsvision/wrd/SIW_LGN",
    icon: <Calendar className="h-5 w-5" />,
    description: "Course registration and academic calendar system",
  },
  {
    id: 3,
    name: "MYSIS",
    url: "https://mysis.um.edu.my/",
    icon: <User className="h-5 w-5" />,
    description: "Student information and management system",
  },
  {
    id: 4,
    name: "Helpdesk",
    url: "https://helpdesk.um.edu.my/",
    icon: <HelpCircle className="h-5 w-5" />,
    description: "Technical support and assistance portal",
  },
  {
    id: 5,
    name: "EBSCO Research",
    url: "https://research.ebsco.com/c/vy25p4/search",
    icon: <Search className="h-5 w-5" />,
    description: "Search academic resources and research databases",
  },
]

export function UmResources() {
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
    <section id="um-resources" className="py-20 bg-background relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <motion.div ref={ref} variants={staggerContainer()} initial="hidden" animate={controls} className="space-y-16">
          <motion.div variants={fadeIn("up")} className="text-center max-w-3xl mx-auto">
            <MagicText effect="gradient" as="h2" className="text-3xl md:text-4xl font-bold mb-6">
              UM Useful Links
            </MagicText>
            <p className="text-lg text-muted-foreground">
              Essential University of Malaya resources for students and faculty members.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {umResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                variants={fadeIn(index % 2 === 0 ? "left" : "right", index * 0.1)}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.1}
                whileDrag={{ scale: 1.02, opacity: 0.9 }}
              >
                <motion.div initial="initial" whileHover="hover" whileTap="tap" variants={cardVariants}>
                  <MagicCard className="h-full">
                    <div className="p-6 h-full">
                      <div className="flex items-start space-x-4">
                        <motion.div
                          className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0"
                          variants={iconVariants}
                        >
                          {resource.icon}
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold">{resource.name}</h3>
                            <AnimatedButton
                              variant="ghost"
                              size="icon"
                              className="rounded-full bg-primary/10 hover:bg-primary/20"
                              onClick={() => window.open(resource.url, "_blank")}
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">Visit {resource.name}</span>
                            </AnimatedButton>
                          </div>
                          <p className="text-muted-foreground">{resource.description}</p>
                        </div>
                      </div>
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
