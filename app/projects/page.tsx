"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { useInView } from "react-intersection-observer"
import EditableContent from "@/components/editable-content"
import { useEditMode } from "@/hooks/use-edit-mode"

export default function ProjectsPage() {
  const { scrollY } = useScroll()
  const { editMode } = useEditMode()

  const [headerRef, headerInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const projects = [
    {
      id: 1,
      title: "Smol Tako Moodle",
      description:
        "A customized Moodle learning management system with enhanced features and a user-friendly interface.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["Moodle", "PHP", "Education", "LMS"],
      liveUrl: "https://class.smoltako.space",
      githubUrl: "#",
    },
    {
      id: 2,
      title: "UM Course Portal",
      description:
        "A comprehensive portal for University of Malaya Year 2 Semester 2 courses with resources and materials.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["Next.js", "React", "Education", "Portal"],
      liveUrl: "https://y2s2.smoltako.space",
      githubUrl: "#",
    },
    {
      id: 3,
      title: "Personal Blog",
      description: "A blog built with modern web technologies to share insights, tutorials, and personal experiences.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["Blog", "Content", "Writing"],
      liveUrl: "https://home.smoltako.space",
      githubUrl: "#",
    },
    {
      id: 4,
      title: "Portfolio Website",
      description:
        "This portfolio website showcasing my projects, skills, and providing a central hub for all my platforms.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["Portfolio", "Next.js", "React", "Tailwind"],
      liveUrl: "https://smoltako.space",
      githubUrl: "#",
    },
    {
      id: 5,
      title: "Digital Art Gallery",
      description: "An online gallery showcasing my digital art creations and illustrations.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["Art", "Gallery", "Creative"],
      liveUrl: "https://0.smoltako.space",
      githubUrl: "#",
    },
    {
      id: 6,
      title: "Web Analytics Dashboard",
      description: "A custom analytics dashboard built on top of Cloudflare to monitor website performance.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["Analytics", "Dashboard", "Cloudflare"],
      liveUrl: "https://cloudflare.smoltako.space",
      githubUrl: "#",
    },
  ]

  // Background parallax effect
  const bgY = useTransform(scrollY, [0, 1000], [0, 300])

  return (
    <main className="relative overflow-hidden">
      {/* Background image with parallax effect */}
      <motion.div className="absolute inset-0 opacity-5 pointer-events-none" style={{ y: bgY }}>
        <Image src="/images/background.png" alt="Background" fill className="object-cover object-center" />
      </motion.div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3c294d]/10 to-white/0 dark:from-[#3c294d]/20 dark:to-[#1a1625]/0 pointer-events-none"></div>

      <section className="relative py-24">
        <div ref={headerRef} className="container mx-auto px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 text-[#3c294d] dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <EditableContent id="projects-title" type="heading">
                My Projects
              </EditableContent>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <EditableContent id="projects-description">
                Here's a collection of my recent work and ongoing projects. Each project represents a unique challenge
                and solution.
              </EditableContent>
            </motion.p>

            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={headerInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Image src="/images/logo.png" alt="Smol Tako" width={80} height={80} className="rounded-full" />
            </motion.div>
          </motion.div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full group transition-all duration-300 hover:shadow-xl border-2 border-[#3c294d]/10 dark:border-[#3c294d]/20 hover:border-[#3c294d]/30 dark:hover:border-[#3c294d]/40 bg-white/80 dark:bg-[#1a1625]/80 backdrop-blur-sm">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={800}
                      height={600}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3c294d]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} className="bg-white/90 text-[#3c294d] hover:bg-white">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-[#3c294d] dark:text-white">
                      <EditableContent id={`project-title-${project.id}`} type="text">
                        {project.title}
                      </EditableContent>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      <EditableContent id={`project-desc-${project.id}`}>{project.description}</EditableContent>
                    </p>
                  </CardContent>

                  <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-[#3c294d]/20 text-[#3c294d] dark:text-white hover:bg-[#3c294d]/10 dark:hover:bg-[#3c294d]/20"
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className="bg-[#3c294d] hover:bg-[#3c294d]/80 dark:bg-[#3c294d]/90 dark:hover:bg-[#3c294d]"
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {editMode && (
            <div className="mt-12 text-center">
              <Button className="bg-[#3c294d] hover:bg-[#3c294d]/80">Add New Project</Button>
            </div>
          )}
        </div>
      </section>

      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-[#3c294d] dark:text-white">
              <EditableContent id="cta-title" type="heading">
                Want to Work Together?
              </EditableContent>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              <EditableContent id="cta-description">
                I'm always open to new projects and collaborations. If you have an idea or project in mind, let's
                discuss how we can bring it to life!
              </EditableContent>
            </p>
            <Button asChild className="bg-[#3c294d] hover:bg-[#3c294d]/80 dark:bg-[#3c294d]/90 dark:hover:bg-[#3c294d]">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

