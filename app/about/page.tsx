"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Download, ExternalLink, Mail, Phone, Linkedin, MapPin, Calendar, Briefcase, GraduationCap } from "lucide-react"
import { MagicText } from "@/components/ui/magic-text"
import { MagicCard } from "@/components/ui/magic-card"
import { MagicButton } from "@/components/ui/magic-button"
import { fadeIn, staggerContainer } from "@/utils/animation-variants"

const contactInfo = {
  phone: "0134540120",
  email: "yinjiasek@gmail.com",
  linkedin: "www.linkedin.com/in/sekyinjia",
  location: "Petaling Jaya, Selangor, Malaysia",
}

const topSkills = ["Event Coordination", "Media Production", "Photography"]

const experiences = [
  {
    id: 1,
    company: "Universiti Malaya Students' Union",
    duration: "7 months",
    isCurrent: true,
    isTopSection: true,
    summary: "Leading IT development and financial management for 60+ student organizations",
    keyAchievements: ["Developed TransFinance platform", "Managed RM63,000+ in funds", "Supported 64+ events"],
    positions: [
      {
        title: "IT Manager in Finance Office",
        period: "April 2025 - Present",
        location: "Federal Territory of Kuala Lumpur, Malaysia",
        highlights: [
          "Led the development of TransFinance, UMSU's financial management platform, digitizing subsidy requests and fund tracking for 60+ clubs/societies.",
          "Automated workflows (Google Forms, approval systems) to streamline financial processes and enhance transparency.",
          "Supported townhall sessions and financial initiatives, ensuring seamless IT operations and resource allocation for student organizations.",
        ],
      },
      {
        title: "Student Body Officer in Finance Office",
        period: "December 2024 - Present",
        location: "Federal Territory of Kuala Lumpur, Malaysia",
        highlights: [
          "Reviewed and approved student subsidy requests for registered clubs and societies, ensuring compliance with KMUM subsidy procedures.",
          "Processed subsidy requests for 64 events and programs from 50+ clubs/societies, managing approximately RM63,000 in funds (until March 2025).",
          "Guided student organizations through the subsidy application process, ensuring accurate and compliant submissions.",
        ],
      },
      {
        title: "Media Officer in Presidential Office",
        period: "December 2024 - Present",
        location: "Federal Territory of Kuala Lumpur, Malaysia",
        highlights: [
          "Supported the UMSU President and Vice President with media materials, including designing presentation slides for meetings with external parties.",
          "Collaborated with the UMSU Media Office to design engaging Instagram posts and visual content for student body communication.",
          "Developed identity materials for UMSU representatives, including profile pictures and personal cards, enhancing organizational branding.",
        ],
      },
    ],
  },
  {
    id: 2,
    company: "Kongres Mahasiswa Universiti Malaya",
    duration: "2 months",
    isCurrent: false,
    isTopSection: true,
    summary: "Led technical operations for inaugural student congress with 84 participants",
    keyAchievements: ["Head of Technical Bureau", "Custom timer tool development", "16+ hours of duty"],
    positions: [
      {
        title: "Head of Technical Bureau",
        period: "May 2025",
        location: "Federal Territory of Kuala Lumpur, Malaysia",
        highlights: [
          "Led the Technical Team for the inaugural Kongres Mahasiswa Universiti Malaya 24/25, a landmark student advocacy event held on 24-25 May 2025.",
          "Served as the official timekeeper during the 2-day congress, dedicating over 16 hours of duty to ensure strict adherence to the event schedule.",
          "Spearheaded the design and implementation of a custom timer tool, accessible at https://kongresmahasiswa.smoltako.space, utilized by over 80 participants.",
          "Managed audio-visual systems and resolved real-time technical challenges, supporting seamless operations for 84 congress members.",
        ],
      },
      {
        title: "Monitoring Bureau of the Special Congress Committee",
        period: "Apr 2025 - May 2025",
        location: "Federal Territory of Kuala Lumpur, Malaysia",
        highlights: [
          "Responsible for monitoring and overseeing the progress of the Special Congress Committee to ensure alignment with organizational goals and timelines.",
          "Collaborated with committee members to track project milestones, identify potential challenges, and provide actionable recommendations for improvement.",
          "Compiled and presented detailed progress reports to stakeholders to maintain transparency and accountability.",
        ],
      },
    ],
  },
  {
    id: 3,
    company: "Kuayue Song Composing Concert",
    duration: "7 months",
    isCurrent: false,
    isTopSection: true,
    summary: "Managed publicity and media content for major cultural concert event",
    keyAchievements: ["Complete visual identity design", "Social media management", "Video production"],
    positions: [
      {
        title: "Publicity and Publication",
        period: "November 2024 - May 2025",
        location: "Federal Territory of Kuala Lumpur, Malaysia",
        highlights: [
          "Designed all publicity and promotional materials for the Kuayue Song Composing Concert, including engaging social media posts and announcements.",
          "Created media content such as recap videos to enhance concert visibility and audience engagement.",
          "Managed the visual identity and branding for the concert's publicity efforts.",
        ],
      },
    ],
  },
  {
    id: 4,
    company: "Event Management Roles",
    duration: "Various",
    isCurrent: false,
    isTopSection: false,
    summary: "PA system management and media support for multiple university events",
    keyAchievements: ["1000+ attendees events", "Audio-visual expertise", "Real-time troubleshooting"],
    positions: [
      {
        title: "PA System Executive in Club and Societies Exhibition",
        period: "April 2025",
        location: "Federal Territory of Kuala Lumpur, Malaysia",
        highlights: [
          "Managed full PA system operations at Auditorium KPS for 60+ UM clubs/societies and 1000+ attendees.",
          "Coordinated real-time troubleshooting during the exhibition, resolving technical issues to maintain uninterrupted event flow.",
          "Collaborated with Media Office team to synchronize audiovisual needs, supporting seamless stage transitions and announcements.",
        ],
      },
      {
        title: "Publicity & Media Executive in Raya Kita-Kita UM",
        period: "March 2025 - April 2025",
        location: "Federal Territory of Kuala Lumpur, Malaysia",
        highlights: [
          "Assisted the Media Team in capturing key moments of Raya Kita-Kita UM 2025, attended by over 1000+ students.",
          "Photographed high-quality images to showcase the Raya mood and campus celebration for publicity and archival purposes.",
          "Managed the PA system operations during the event, ensuring clear and seamless audio delivery for announcements and performances.",
        ],
      },
    ],
  },
  {
    id: 5,
    company: "Teaching & Academic Roles",
    duration: "Various",
    isCurrent: false,
    isTopSection: false,
    summary: "Educational support and academic leadership across multiple institutions",
    keyAchievements: ["150+ students taught", "LinkedIn workshop director", "Academic executive"],
    positions: [
      {
        title: "MY STEP Guru Ganti",
        period: "July 2024 - August 2024",
        location: "Pokok Sena, Kedah, Malaysia",
        highlights: [
          "Facilitated the learning process for over 150 students in Science, Mathematics, English, and Physics.",
          "Supported the coordination of school activities involving over 500 participants.",
          "Crafted tailored over 50 lesson plans that addressed the unique learning styles and needs of each class.",
        ],
      },
      {
        title: "Academic Executive UMSU Faculty of Science",
        period: "December 2023 - May 2024",
        location: "Malaysia",
        highlights: [
          "Organized and directed the LinkedIn Building Workshop for 62 faculty participants, enhancing professional networking skills.",
          "In charged in the distribution of the The Lost Food Project Bread Rescue which benefits up to 130 students of Faculty of Science.",
          "Managed Petri Dish Distribution across multiple departments in the Institute of Biological Sciences, supporting research activities.",
        ],
      },
      {
        title: "Peer Assistant Learning Leader",
        period: "October 2022 - May 2023",
        location: "Kedah, Malaysia",
        highlights: [
          "Facilitated weekly discussion sessions for groups of 10 students, improving their understanding of physics concepts.",
          "Coordinated PAL Open Day activities as Station Manager, showcasing physics principles to prospective students.",
        ],
      },
    ],
  },
  {
    id: 6,
    company: "Early Career & Part-time Roles",
    duration: "Various",
    isCurrent: false,
    isTopSection: false,
    summary: "Customer service, kitchen operations, and financial management experience",
    keyAchievements: ["500+ gift baskets assembled", "Financial management", "Team leadership"],
    positions: [
      {
        title: "Kitchen Assistant at Caffe Diem",
        period: "June 2023 - August 2023",
        location: "Alor Setar, Kedah, Malaysia",
        highlights: [
          "Prepared over 20 ingredients for menu items, including sauce preparation, cooking sauces, and food assembly.",
          "Assisted in meal preparation and event catering for up to 150 people.",
          "Processed orders within 10 minutes under supervision of senior staff.",
          "Guided junior staff in daily tasks over a 2-month period, ensuring efficiency and accuracy.",
        ],
      },
      {
        title: "Treasurer of EXCO Academic and Leadership",
        period: "October 2022 - May 2023",
        location: "Kedah, Malaysia",
        highlights: [
          "Held a alumni talk for 80 students.",
          "Responsible for managing the finances and budgets of the Academic and Leadership Bureau in the council.",
          "Worked collaboratively with other bureau members to plan and organize various academic and leadership events and programs.",
        ],
      },
      {
        title: "Sales Assistant at Pacific Hypermarket",
        period: "April 2022",
        location: "Alor Setar, Kedah, Malaysia",
        highlights: [
          "Assembled over 500 gift baskets and hampers.",
          "Promoted and provided personalized recommendations to customers, ensuring product selections aligned with individual preferences and occasions.",
        ],
      },
    ],
  },
]

function ExperienceSection({ experiences }: { experiences: typeof experiences }) {
  const [showDetailed, setShowDetailed] = useState<number[]>([])

  const toggleDetailed = (id: number) => {
    setShowDetailed((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  // Card hover variants
  const cardHoverVariants = {
    initial: {
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  // Button hover variants
  const buttonHoverVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
    tap: {
      scale: 0.95,
      y: 0,
    },
  }

  return (
    <div className="space-y-6">
      {experiences.map((exp) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: exp.id * 0.1 }}
        >
          <motion.div variants={cardHoverVariants} initial="initial" whileHover="hover" className="cursor-pointer">
            <MagicCard effect="spotlight" className="overflow-hidden transition-all duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${exp.isCurrent ? "bg-green-500" : "bg-gray-400"}`} />
                      <h4 className="text-xl font-semibold">{exp.company}</h4>
                      {exp.isCurrent && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 text-xs rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{exp.duration}</p>
                    <p className="text-muted-foreground mb-4">{exp.summary}</p>

                    {/* Key Achievements Pills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.keyAchievements.map((achievement, idx) => (
                        <span key={idx} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View Details Button - Only for non-top sections */}
                  {!exp.isTopSection && (
                    <div className="ml-4">
                      <motion.button
                        onClick={() => toggleDetailed(exp.id)}
                        variants={buttonHoverVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-colors shadow-md hover:shadow-lg"
                      >
                        {showDetailed.includes(exp.id) ? "Hide Details" : "View Details"}
                      </motion.button>
                    </div>
                  )}
                </div>

                {/* Always show detailed view for top sections */}
                {exp.isTopSection && (
                  <div className="border-t pt-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <span className="font-medium">Detailed Experience</span>
                    </div>

                    <div className="space-y-6">
                      {exp.positions.map((position, posIndex) => (
                        <motion.div
                          key={posIndex}
                          className="border-l-2 border-primary/20 pl-4"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: posIndex * 0.1 }}
                        >
                          <h5 className="font-medium text-lg">{position.title}</h5>
                          <p className="text-sm text-muted-foreground mb-2">{position.period}</p>
                          <p className="text-sm text-muted-foreground mb-3">{position.location}</p>
                          <ul className="space-y-2">
                            {position.highlights.map((highlight, highlightIndex) => (
                              <motion.li
                                key={highlightIndex}
                                className="text-sm text-muted-foreground flex items-start gap-2"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: posIndex * 0.1 + highlightIndex * 0.05 }}
                              >
                                <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                                {highlight}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detailed View for non-top sections - only when toggled */}
                <AnimatePresence>
                  {!exp.isTopSection && showDetailed.includes(exp.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t pt-4"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Briefcase className="h-5 w-5 text-primary" />
                        <span className="font-medium">Detailed Experience</span>
                      </div>

                      <div className="space-y-6">
                        {exp.positions.map((position, posIndex) => (
                          <motion.div
                            key={posIndex}
                            className="border-l-2 border-primary/20 pl-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: posIndex * 0.1 }}
                          >
                            <h5 className="font-medium text-lg">{position.title}</h5>
                            <p className="text-sm text-muted-foreground mb-2">{position.period}</p>
                            <p className="text-sm text-muted-foreground mb-3">{position.location}</p>
                            <ul className="space-y-2">
                              {position.highlights.map((highlight, highlightIndex) => (
                                <motion.li
                                  key={highlightIndex}
                                  className="text-sm text-muted-foreground flex items-start gap-2"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: posIndex * 0.1 + highlightIndex * 0.05 }}
                                >
                                  <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                                  {highlight}
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </MagicCard>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

const education = [
  {
    institution: "University of Malaya",
    degree: "Bachelor of Science - BS, Physics",
    period: "October 2023 - July 2027",
    status: "Year 2",
  },
  {
    institution: "Kolej Matrikulasi Kedah",
    degree: "Foundation degree, Physical Sciences",
    period: "2021 - 2022",
  },
  {
    institution: "SMK St Michael",
    degree: "Secondary School",
    period: "January 2017 - March 2022",
  },
]

export default function AboutPage() {
  const [showResume, setShowResume] = useState(false)

  return (
    <main className="min-h-screen bg-background pt-16">
      <div className="container px-4 py-12 mx-auto">
        <motion.div variants={staggerContainer()} initial="hidden" animate="show" className="space-y-16">
          {/* Header Section */}
          <motion.div variants={fadeIn("up")} className="text-center max-w-4xl mx-auto">
            <MagicText effect="gradient" as="h1" className="text-4xl md:text-5xl font-bold mb-6">
              About Me
            </MagicText>
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold mb-2">Yin Jia Sek</h2>
              <p className="text-lg text-muted-foreground">
                BSc. Physics (Year 2) at UM | Media & Student Body Officer, Universiti Malaya Students' Union | Kuayue
                Song Composing Concert Publicity & Publication | Illustrator
              </p>
            </div>
          </motion.div>

          {/* Resume Viewer Section */}
          <motion.div variants={fadeIn("up", 0.2)} className="max-w-4xl mx-auto">
            <MagicCard effect="spotlight" className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold mb-4 md:mb-0">Resume</h3>
                <div className="flex gap-4">
                  <MagicButton
                    effect="gradient"
                    onClick={() => setShowResume(!showResume)}
                    className="flex items-center gap-2"
                  >
                    {showResume ? "Hide Resume" : "View Resume"}
                    <ExternalLink className="h-4 w-4" />
                  </MagicButton>
                  <MagicButton
                    effect="shine"
                    onClick={() => window.open("/resume.pdf", "_blank")}
                    className="flex items-center gap-2"
                  >
                    Download PDF
                    <Download className="h-4 w-4" />
                  </MagicButton>
                </div>
              </div>

              {showResume && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "600px" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full border rounded-lg overflow-hidden"
                >
                  <iframe src="/resume.pdf" className="w-full h-full" title="Resume PDF" />
                </motion.div>
              )}
            </MagicCard>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={fadeIn("up", 0.3)} className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6 text-center">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MagicCard effect="border" className="p-4 text-center">
                <Phone className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h4 className="font-medium mb-2">Phone</h4>
                <p className="text-sm text-muted-foreground">{contactInfo.phone}</p>
              </MagicCard>

              <MagicCard effect="border" className="p-4 text-center">
                <Mail className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h4 className="font-medium mb-2">Email</h4>
                <p className="text-sm text-muted-foreground">{contactInfo.email}</p>
              </MagicCard>

              <MagicCard effect="border" className="p-4 text-center">
                <Linkedin className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h4 className="font-medium mb-2">LinkedIn</h4>
                <p className="text-sm text-muted-foreground break-all">{contactInfo.linkedin}</p>
              </MagicCard>

              <MagicCard effect="border" className="p-4 text-center">
                <MapPin className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h4 className="font-medium mb-2">Location</h4>
                <p className="text-sm text-muted-foreground">{contactInfo.location}</p>
              </MagicCard>
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div variants={fadeIn("up", 0.4)} className="max-w-4xl mx-auto">
            <MagicCard effect="spotlight" className="p-6">
              <h3 className="text-2xl font-semibold mb-4">Summary</h3>
              <p className="text-muted-foreground leading-relaxed">
                Year 2 BSc. Physics student at Universiti Malaya, passionate about science and creativity. As a Media
                and Student Body Officer with the Universiti Malaya Students' Union, I advocate for students and amplify
                our voice. I also handle publicity and publication for the Kuayue Song Composing Concert, ensuring its
                success. An illustrator at heart, I love blending art with my academic pursuits. I'm driven by curiosity
                and collaboration—let's connect over physics, creativity, or making a difference!
              </p>
            </MagicCard>
          </motion.div>

          {/* Top Skills */}
          <motion.div variants={fadeIn("up", 0.5)} className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6 text-center">Top Skills</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {topSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience Section */}
          <motion.div variants={fadeIn("up", 0.6)} className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6 text-center">Experience</h3>
            <ExperienceSection experiences={experiences} />
          </motion.div>

          {/* Education Section */}
          <motion.div variants={fadeIn("up", 0.7)} className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6 text-center">Education</h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <MagicCard key={index} effect="border" className="p-6">
                  <div className="flex items-start gap-4">
                    <GraduationCap className="h-6 w-6 text-primary mt-1" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{edu.institution}</h4>
                      <p className="text-muted-foreground">{edu.degree}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{edu.period}</span>
                        {edu.status && (
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                            {edu.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </MagicCard>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
