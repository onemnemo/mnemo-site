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
    ]
  },
}

export default nextConfig
