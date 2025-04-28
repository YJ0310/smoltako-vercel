import { WorkspaceSection } from "@/components/workspace/workspace-section"
import { LinkCard } from "@/components/workspace/link-card"

const personalLinks = [
  {
    title: "Email",
    description: "Personal Gmail account",
    href: "https://mail.google.com/mail/u/?authuser=yinjiasek@gmail.com",
    icon: "mail",
  },
  {
    title: "UM Stuff Drive",
    description: "University of Malaya resources and materials",
    href: "https://drive.google.com/drive/folders/11Hb8zq1RRyxMAfZ5J2Te7LKyIKB_nfcD?usp=drive_link",
    icon: "folder",
  },
  {
    title: "SIF2009 Lab",
    description: "Laboratory materials and resources",
    href: "https://drive.google.com/drive/folders/1wpsnykTdu3f2sJzBskM0c4VkHnFmNLvP?usp=sharing",
    icon: "flask",
  },
]

const financeOfficeLinks = [
  {
    title: "Email",
    description: "Finance office email account",
    href: "https://mail.google.com/mail/u/?authuser=kewangan@myumsu.org",
    icon: "mail",
  },
  {
    title: "Subsidy Control Account",
    description: "Financial tracking and management spreadsheet",
    href: "https://docs.google.com/spreadsheets/d/1IGXX55bJe2KiUfOcSTidFuO_UtC9-n5xslvqeAQq9wo/edit?usp=sharing",
    icon: "calculator",
  },
]

export default function WorkspacePage() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <div className="container mx-auto px-4 py-12 flex-grow">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
          Personal Workspace
        </h1>

        <div className="grid gap-12">
          <WorkspaceSection title="Personal Links" description="Quick access to personal resources and accounts">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalLinks.map((link) => (
                <LinkCard
                  key={link.title}
                  title={link.title}
                  description={link.description}
                  href={link.href}
                  icon={link.icon}
                />
              ))}
            </div>
          </WorkspaceSection>

          <WorkspaceSection title="Finance Office" description="Financial management tools and resources">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {financeOfficeLinks.map((link) => (
                <LinkCard
                  key={link.title}
                  title={link.title}
                  description={link.description}
                  href={link.href}
                  icon={link.icon}
                />
              ))}
            </div>
          </WorkspaceSection>
        </div>
      </div>
    </main>
  )
}
