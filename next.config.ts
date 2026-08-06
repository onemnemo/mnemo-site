import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /**
   * /docs has no landing page of its own: user docs are the front door
   * (they are most of the traffic), and developers switch audience from
   * the docs sidebar. Temporary redirect on purpose; flip to permanent
   * once the docs information architecture has settled.
   */
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/users",
        permanent: false,
      },
      /**
       * The old Astro site filed user docs under /docs/students. The
       * article sets do not match one to one, so inbound links land on
       * the users front door rather than 404ing on a guessed path.
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
