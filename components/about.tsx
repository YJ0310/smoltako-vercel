"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function About() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-10"></div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden border-4 border-background shadow-xl">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="John Doe"
                  width={600}
                  height={600}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Full Stack Developer based in New York</h3>
              <p className="text-muted-foreground mb-6">
                I'm a passionate developer with over 5 years of experience building web applications. I specialize in
                creating responsive, accessible, and performant web experiences using modern technologies.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-4xl font-bold text-primary">5+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-4xl font-bold text-primary">50+</div>
                    <div className="text-sm text-muted-foreground">Projects Completed</div>
                  </CardContent>
                </Card>
              </div>

              <p className="text-muted-foreground">
                When I'm not coding, you can find me hiking, reading, or experimenting with new technologies. I'm always
                looking for new challenges and opportunities to grow as a developer.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

