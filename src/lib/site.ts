/** Site wide constants. Kept framework free so later features (auth, sync) can share them. */
export const REPO = 'onemnemo/mnemo'
export const GITHUB_URL = `https://github.com/${REPO}`
export const RELEASES_URL = `${GITHUB_URL}/releases`
export const LATEST_RELEASE_URL = `${RELEASES_URL}/latest`
export const LATEST_RELEASE_API = `https://api.github.com/repos/${REPO}/releases/latest`
export const ISSUES_URL = `${GITHUB_URL}/issues`
export const FALLBACK_VERSION = '0.8.2'

/**
 * TODO: production domain is not decided. Once it is, set it here and add og:image, og:url
 * and <link rel="canonical"> to index.html, which need absolute URLs.
 */
export const SITE_URL: string | null = null
