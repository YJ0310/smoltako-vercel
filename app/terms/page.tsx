import Link from "next/link"
import { Button } from "@/components/ui/button"
import TakoIllustration from "@/components/tako-illustration"

export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-blue-600">Terms of Service</h1>
          <div className="flex justify-center">
            <TakoIllustration width={60} height={60} className="text-pink-300" />
          </div>
        </div>

        <div className="prose prose-blue max-w-none">
          <p className="text-lg text-gray-600 mb-6">Last updated: March 21, 2025</p>

          <h2 className="text-2xl font-bold text-blue-600 mt-8 mb-4">Introduction</h2>
          <p className="text-gray-600 mb-4">
            Welcome to Smol Tako. By using our website and services, you agree to these terms. Please read them
            carefully.
          </p>

          <h2 className="text-2xl font-bold text-blue-600 mt-8 mb-4">Using Our Services</h2>
          <p className="text-gray-600 mb-4">
            You must follow any policies made available to you within the Services. Don't misuse our Services. For
            example, don't interfere with our Services or try to access them using a method other than the interface and
            the instructions that we provide.
          </p>

          <h2 className="text-2xl font-bold text-blue-600 mt-8 mb-4">Your Content</h2>
          <p className="text-gray-600 mb-4">
            Some of our Services allow you to upload, submit, store, send or receive content. You retain ownership of
            any intellectual property rights that you hold in that content.
          </p>

          <h2 className="text-2xl font-bold text-blue-600 mt-8 mb-4">Software in Our Services</h2>
          <p className="text-gray-600 mb-4">
            When a Service requires or includes downloadable software, this software may update automatically on your
            device once a new version or feature is available.
          </p>

          <h2 className="text-2xl font-bold text-blue-600 mt-8 mb-4">Modifying and Terminating Our Services</h2>
          <p className="text-gray-600 mb-4">
            We are constantly changing and improving our Services. We may add or remove functionalities or features, and
            we may suspend or stop a Service altogether.
          </p>

          <h2 className="text-2xl font-bold text-blue-600 mt-8 mb-4">Liability for Our Services</h2>
          <p className="text-gray-600 mb-4">
            To the extent permitted by law, we exclude all warranties, and our liability for damages is limited.
          </p>

          <h2 className="text-2xl font-bold text-blue-600 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-6">
            If you have any questions about these Terms, please contact us at terms@smoltako.space.
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

