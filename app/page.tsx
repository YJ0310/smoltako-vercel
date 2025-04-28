import { Hero } from "@/components/hero"
import { Navbar } from "@/components/navbar"
import { About } from "@/components/about"
import { Platforms } from "@/components/platforms"
import { Illustrations } from "@/components/illustrations"
import { AiTools } from "@/components/ai-tools"
import { UmResources } from "@/components/um-resources"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { ScrollProgress } from "@/components/ui/scroll-progress"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      <About />
      <Platforms />
      <AiTools />
      <UmResources />
      <Illustrations />
      <Contact />
      <Footer />
    </main>
  )
}
