import { Card, CardContent } from "@/components/ui/card"

export default function DeploymentGuide() {
  return (
    <Card className="border-2 border-blue-100">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Deploying to Cloudflare Pages</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-pink-500">Step 1: Push to GitHub</h3>
            <p className="text-gray-600">Push the generated code to a GitHub repository.</p>
            <pre className="bg-gray-100 p-3 rounded-md mt-2 text-sm overflow-x-auto">
              <code>
                git init
                <br />
                git add .<br />
                git commit -m "Initial commit"
                <br />
                git remote add origin https://github.com/yourusername/smoltako-portfolio.git
                <br />
                git push -u origin main
              </code>
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-pink-500">Step 2: Connect to Cloudflare Pages</h3>
            <ol className="list-decimal pl-6 text-gray-600">
              <li>Log in to your Cloudflare account</li>
              <li>Go to the Pages section</li>
              <li>Click "Create a project"</li>
              <li>Connect your GitHub account</li>
              <li>Select your repository</li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-pink-500">Step 3: Configure Build Settings</h3>
            <p className="text-gray-600">Set the following build settings:</p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Framework preset: Next.js</li>
              <li>
                Build command: <code className="bg-gray-100 px-2 py-1 rounded">npm run build</code>
              </li>
              <li>
                Build output directory: <code className="bg-gray-100 px-2 py-1 rounded">.next</code>
              </li>
              <li>Node.js version: 18 (or latest)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-pink-500">Step 4: Deploy</h3>
            <p className="text-gray-600">Click "Save and Deploy" to start the deployment process.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-pink-500">Step 5: Configure Custom Domain</h3>
            <ol className="list-decimal pl-6 text-gray-600">
              <li>Go to the "Custom domains" tab in your Cloudflare Pages project</li>
              <li>Click "Set up a custom domain"</li>
              <li>
                Enter your domain: <code className="bg-gray-100 px-2 py-1 rounded">smoltako.space</code>
              </li>
              <li>Follow the instructions to verify and configure your domain</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

