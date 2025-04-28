import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeTransition } from "@/components/theme-transition"
import { FrostedBackground } from "@/components/frosted-background"
import { Navbar } from "@/components/navbar"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Smol Tako - Portfolio",
  description: "Personal portfolio website with a modern design",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stelle-honkai-star-rail-stelle-c4r1eBcqArRU4WjejmyxpZznPSIlba.ico",
    shortcut:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stelle-honkai-star-rail-stelle-c4r1eBcqArRU4WjejmyxpZznPSIlba.ico",
    apple:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stelle-honkai-star-rail-stelle-c4r1eBcqArRU4WjejmyxpZznPSIlba.ico",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ThemeTransition>
            <FrostedBackground>
              <Navbar />
              <div className="pt-16">{children}</div>
              <Contact />
              <Footer />
            </FrostedBackground>
          </ThemeTransition>
        </ThemeProvider>
      </body>
    </html>
  )
}
