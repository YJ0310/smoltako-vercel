export default {
  async fetch(request, env) {
    // The rest of your Worker logic goes here
    const url = new URL(request.url)

    // Add security headers
    const securityHeaders = {
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:;",
      "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    }

    // Let the Pages middleware handle everything else
    return env.ASSETS.fetch(request.url, {
      headers: securityHeaders,
    })
  },
}

