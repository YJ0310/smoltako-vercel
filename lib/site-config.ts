// Site configuration that can be edited through the admin interface
// This file will be updated when changes are saved in the editor

export type Platform = {
  id: string
  name: string
  description: string
  url: string
  image: string
  tags: string[]
  featured: boolean
  order: number
}

export type SiteConfig = {
  siteName: string
  siteDescription: string
  heroTitle: string
  heroSubtitle: string
  aboutText: string
  contactEmail: string
  socialLinks: {
    github: string
    twitter: string
    linkedin: string
    instagram: string
  }
  platforms: Platform[]
}

const siteConfig: SiteConfig = {
  siteName: "Smol Tako",
  siteDescription: "Portfolio & Multifunction Website",
  heroTitle: "Hi, I'm Smol Tako!",
  heroSubtitle:
    "Welcome to my portfolio and multifunction website. Explore my projects and connect with me through the various platforms.",
  aboutText:
    "I'm a passionate developer and educator with a focus on creating accessible learning resources and tools for students.",
  contactEmail: "hello@smoltako.space",
  socialLinks: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
  platforms: [
    {
      id: "moodle",
      name: "Smol Tako Moodle",
      description:
        "A customized Moodle learning management system with enhanced features and a user-friendly interface.",
      url: "https://class.smoltako.space",
      image: "/images/platforms/moodle.jpeg",
      tags: ["Education", "LMS", "Courses"],
      featured: true,
      order: 1,
    },
    {
      id: "um-courses",
      name: "Year 2 Semester 2 UM Courses",
      description:
        "A comprehensive portal for University of Malaya Year 2 Semester 2 courses with resources and materials.",
      url: "https://y2s2.smoltako.space",
      image: "/images/platforms/um-courses.png",
      tags: ["Education", "University", "Courses"],
      featured: true,
      order: 2,
    },
    {
      id: "wix-sites",
      name: "Wix Sites",
      description: "Custom Wix website collection with various educational tools and resources.",
      url: "https://home.smoltako.space",
      image: "/images/platforms/wix-sites.png",
      tags: ["Tools", "Resources", "Education"],
      featured: true,
      order: 3,
    },
    {
      id: "google-sites",
      name: "Google Sites",
      description: "Google Sites projects with educational content and interactive tools.",
      url: "https://0.smoltako.space",
      image: "/images/platforms/google-sites.png",
      tags: ["Tools", "Resources", "Education"],
      featured: true,
      order: 4,
    },
    {
      id: "cloudflare",
      name: "Cloudflare Dashboard",
      description: "Website analytics and management dashboard for monitoring performance.",
      url: "https://cloudflare.smoltako.space",
      image: "/images/platforms/cloudflare.png",
      tags: ["Analytics", "Management", "Performance"],
      featured: false,
      order: 5,
    },
  ],
}

export default siteConfig

