import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { EditModeProvider } from "@/hooks/use-edit-mode"
import AdminBar from "@/components/admin-bar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Smol Tako - Portfolio & Multifunction Website",
  description:
    "Welcome to Smol Tako's portfolio and multifunction website. Explore my projects and connect with me through various platforms.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-white dark:bg-[#1a1625]`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <EditModeProvider>
            <Navbar />
            <AdminBar />
            <main className="min-h-screen pt-16">{children}</main>
            <Footer />
          </EditModeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

