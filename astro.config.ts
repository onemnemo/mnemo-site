import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://mnemo.one",
  output: "static",
  trailingSlash: "never",
  // The docs have no landing page of their own; the sidebar tabs handle
  // switching between the two sections.
  redirects: { "/docs": "/docs/students" },
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    },
  },
});
