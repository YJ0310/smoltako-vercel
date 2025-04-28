"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Educational Portal",
    description: "A comprehensive learning platform with course management, assignments, and progress tracking.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wix%20sites-2jx4X7kAtx9ZKC3n1NjGgwhPYroXqL.png",
    tags: ["Next.js", "React", "Tailwind CSS"],
    demoLink: "#",
    githubLink: "#",
  },
  {
    id: 2,
    title: "Course Calendar",
    description: "Interactive calendar application for scheduling and managing academic courses and events.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/google%20sites-sJqYJoFMzfugRurIPipOooRCAEge8Z.png",
    tags: ["React", "TypeScript", "CSS Grid"],
    demoLink: "#",
    githubLink: "#",
  },
  {
    id: 3,
    title: "Web Dashboard",
    description: "Analytics dashboard for monitoring website performance and user engagement metrics.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cloudflare-y0bjcllYO3g0aDNLSuA3h5lqxtYPuH.png",
    tags: ["Next.js", "Chart.js", "API Integration"],
    demoLink: "#",
    githubLink: "#",
  },
]

export function Projects() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="projects" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Projects</h2>
          <p className="text-lg text-muted-foreground">
            Explore some of my recent work and personal projects that showcase my skills and expertise.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:text-primary/80 flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" /> Live Demo
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:text-primary/80 flex items-center"
                    >
                      <Github className="h-4 w-4 mr-1" /> GitHub
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
