import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://mnemo.one",
  output: "static",
  trailingSlash: "never",
  integrations: [sitemap()],
});
