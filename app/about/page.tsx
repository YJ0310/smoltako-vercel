import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import TakoIllustration from "@/components/tako-illustration"

export default function AboutPage() {
  const skills = [
    "Web Development",
    "Design",
    "Moodle Administration",
    "Content Creation",
    "UI/UX Design",
    "Project Management",
    "Digital Marketing",
    "SEO Optimization",
  ]

  const interests = ["Technology", "Education", "Art & Design", "Gaming", "Music", "Photography", "Travel", "Reading"]

  return (
    <main className="container mx-auto px-4 py-12">
      <section className="mb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-blue-600">About Me</h1>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10">
                  <Image
                    src="https://via.placeholder.com/300"
                    alt="Smol Tako"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 text-pink-300 opacity-50 transform rotate-12 z-0">
                  <TakoIllustration width={100} height={100} />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-blue-600">Hello there!</h2>
              <p className="text-gray-600 mb-4">
                I'm Smol Tako, a passionate web developer and designer with a love for creating beautiful, functional
                websites and digital experiences.
              </p>
              <p className="text-gray-600 mb-4">
                With experience in various web technologies and platforms, I enjoy bringing creative ideas to life
                through code and design. My background in education has also given me a unique perspective on creating
                user-friendly interfaces and learning management systems.
              </p>
              <p className="text-gray-600">
                When I'm not coding or designing, you can find me exploring new technologies, creating digital art, or
                enjoying a good book.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-blue-100">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-blue-600 flex items-center">
                  Skills
                  <div className="ml-2 text-pink-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2v20" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} className="bg-blue-100 text-blue-600 hover:bg-blue-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-100">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-pink-500 flex items-center">
                  Interests
                  <div className="ml-2 text-blue-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9 12h6" />
                      <path d="M12 9v6" />
                    </svg>
                  </div>
                </h2>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <Badge key={index} className="bg-pink-100 text-pink-600 hover:bg-pink-200">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">My Journey</h2>
          <div className="bg-white p-8 rounded-lg shadow-md border-2 border-blue-100">
            <div className="space-y-6">
              <div className="border-l-4 border-pink-300 pl-4">
                <h3 className="text-xl font-bold text-blue-600">Education</h3>
                <p className="text-gray-600">
                  Bachelor's Degree in Computer Science with a focus on Web Development and Design.
                </p>
              </div>

              <div className="border-l-4 border-blue-300 pl-4">
                <h3 className="text-xl font-bold text-pink-500">Experience</h3>
                <p className="text-gray-600">
                  Over 5 years of experience in web development, design, and digital content creation.
                </p>
              </div>

              <div className="border-l-4 border-pink-300 pl-4">
                <h3 className="text-xl font-bold text-blue-600">Projects</h3>
                <p className="text-gray-600">
                  Worked on various projects including e-learning platforms, portfolio websites, and digital marketing
                  campaigns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-600">Let's Connect!</h2>
          <p className="text-gray-600 mb-6">
            I'm always open to new opportunities, collaborations, or just a friendly chat. Feel free to reach out
            through the contact page.
          </p>
          <div className="flex justify-center">
            <TakoIllustration width={80} height={80} className="text-pink-300" />
          </div>
        </div>
      </section>
    </main>
  )
}

