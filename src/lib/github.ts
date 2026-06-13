/**
 * GitHub repo metadata. Version is fetched at build time with a static
 * fallback. Stars are also fetched at build time for SSR, then refreshed
 * in the browser so the header stays current without redeploying.
 */

import { SITE } from "../data/site";

/** owner/repo slug derived from SITE.github */
export const REPO = SITE.github.replace("https://github.com/", "");
const FALLBACK_VERSION = "v0.6.5";

interface RepoInfo {
  stars: number | null;
  version: string;
}

let cached: RepoInfo | null = null;

export async function getRepoInfo(): Promise<RepoInfo> {
  if (cached) return cached;

  let stars: number | null = null;
  let version = FALLBACK_VERSION;

  try {
    const [repoRes, releaseRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${REPO}`),
      fetch(`https://api.github.com/repos/${REPO}/releases/latest`),
    ]);
    if (repoRes.ok) {
      const repo = await repoRes.json();
      if (typeof repo.stargazers_count === "number") {
        stars = repo.stargazers_count;
      }
    }
    if (releaseRes.ok) {
      const release = await releaseRes.json();
      if (typeof release.tag_name === "string") {
        version = release.tag_name;
      }
    }
  } catch {
    // Offline build or rate limited. Fallbacks above apply.
  }

  cached = { stars, version };
  return cached;
}

export function formatStars(stars: number): string {
  if (stars >= 1000) {
    return `${(stars / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(stars);
}
