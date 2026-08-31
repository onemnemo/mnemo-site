import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    /**
     * 75 is next/image's own default, used everywhere quality is left
     * unset. 90 is opt-in, for the small lifted-detail crops in
     * ScreenshotCrop where compression softness compounds with the crop's
     * own magnification.
     */
    qualities: [75, 90],
  },

  /**
   * /docs has no landing page of its own: user docs are the front door, and
   * developers switch audience from the docs sidebar. The redirect stays
   * temporary until the docs information architecture settles.
   */
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/users",
        permanent: false,
      },
      /**
       * The old Astro site filed user docs under /docs/students. The article
       * sets do not match one to one, so inbound links land on the users
       * front door rather than 404ing on a guessed path.
       */
      {
        source: "/docs/students/:path*",
        destination: "/docs/users",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
