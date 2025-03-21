"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Layout, Server, Smartphone, Figma, Terminal } from "lucide-react"

export default function Skills() {
  const skillCategories = [
    {
      id: 1,
      title: "Frontend Development",
      icon: <Layout className="h-6 w-6" />,
      skills: ["HTML/CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion"],
    },
    {
      id: 2,
      title: "Backend Development",
      icon: <Server className="h-6 w-6" />,
      skills: ["Node.js", "Express", "Python", "Django", "REST APIs", "GraphQL"],
    },
    {
      id: 3,
      title: "Database",
      icon: <Database className="h-6 w-6" />,
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Prisma", "Supabase"],
    },
    {
      id: 4,
      title: "Mobile Development",
      icon: <Smartphone className="h-6 w-6" />,
      skills: ["React Native", "Expo", "Flutter", "Mobile-First Design"],
    },
    {
      id: 5,
      title: "UI/UX Design",
      icon: <Figma className="h-6 w-6" />,
      skills: ["Figma", "Adobe XD", "Responsive Design", "Wireframing", "Prototyping"],
    },
    {
      id: 6,
      title: "DevOps & Tools",
      icon: <Terminal className="h-6 w-6" />,
      skills: ["Git", "GitHub", "CI/CD", "Docker", "AWS", "Vercel", "Netlify"],
    },
  ]

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-10"></div>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            I've worked with a variety of technologies in the web development world. Here's an overview of my technical
            skills:
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: category.id * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-md bg-primary/10 text-primary">{category.icon}</div>
                      <h3 className="text-xl font-semibold">{category.title}</h3>
                    </div>

                    <ul className="space-y-2">
                      {category.skills.map((skill) => (
                        <li key={skill} className="flex items-center gap-2">
                          <Code className="h-4 w-4 text-primary" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

