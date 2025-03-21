import Link from "next/link"
import { Button } from "@/components/ui/button"
import TakoIllustration from "@/components/tako-illustration"

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-blue-600">Privacy Policy</h1>
          <div className="flex justify-center">
            <TakoIllustration width={60} height={60} className="text-pink-300" />
          </div>
        </div>

        <div className="prose prose-blue max-w-none">
          <p className="text-lg text-gray-600 mb-6">Last updated: March 21, 2025</p>

          <h2 className="text-2xl font-bold text-blue-600 mt-8 mb-4">Introduction</h2>
          <p className="text-gray-600 mb-4">
            Welcome to Smol Tako's Privacy Policy. This policy describes how we collect, use, and handle your
            information when you use our services.
          </p>

          <h2 className="text-2xl font-bold text-blue-600 mt-8 mb-4">Information We Collect</h2>
          <p className="text-gray-600 mb-4">
            We collect information to provide better services to all our users. The information we collect includes:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Information you provide to us (such as name, email address, etc.)</li>
            <li>Information we get when you use our services</li>
            <li>Log information and device information</li>
            <li>Location information</li>
            <li>Cookies and similar technologies</li>
          </ul>

          <h2 className="text-2xl font-bold text-blue-600 mt-8 mb-4">How We Use Information</h2>
          <p className="text-gray-600 mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Provide, maintain, and improve our services</li>
            <li>Develop new services</li>
            <li>Protect our users and the public</li>
            <li>Communicate with you about our services</li>
          </ul>

          <h2 className="text-2xl font-bold text-blue-600 mt-8 mb-4">Information Sharing</h2>
          <p className="text-gray-600 mb-4">
            We do not share personal information with companies, organizations, or individuals outside of Smol Tako
            except in the following cases:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>With your consent</li>
            <li>For legal reasons</li>
            <li>To protect Smol Tako's rights, property, or safety</li>
          </ul>

          <h2 className="text-2xl font-bold text-blue-600 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-6">
            If you have any questions about this Privacy Policy, please contact us at privacy@smoltako.space.
          </p>
        </div>

        <div className="mt-12 text-center">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

