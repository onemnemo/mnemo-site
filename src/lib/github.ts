/**
 * Build-time GitHub data with static fallbacks. The site is fully static,
 * so these values are baked in at build time. If the API is unreachable
 * (rate limits, offline builds), we fall back to known-good values.
 */

const REPO = "onemnemo/mnemo";
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
