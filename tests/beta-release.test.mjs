import assert from "node:assert/strict"
import { test } from "node:test"
import { detectPlatform, platforms, releasesUrl, selectBetaRelease } from "../src/lib/beta-release.ts"

function release(tag, overrides = {}) {
  const names = Object.values(platforms).flatMap(p => [p.installer, p.portable])
  const channel = tag.includes("-rc.") ? "beta" : "stable"
  return {
    tag_name: tag, draft: false, prerelease: channel === "beta",
    assets: [...names, "SHA256SUMS.txt"].map(name => {
      name = name.replace("-beta", `-${channel}`)
      return { name, state: "uploaded", size: 12345, browser_download_url: `${releasesUrl}/download/${tag}/${name}` }
    }),
    ...overrides,
  }
}

test("selects RCs numerically and excludes drafts, nightlies, old stable, and malformed tags", () => {
  const result = selectBetaRelease([
    release("v0.8.0-rc.2"), release("v0.8.0-nightly.99"), release("v0.6.5"),
    release("v0.8.0-rc.10"), release("v0.8.0-rc.11", { draft: true }),
    ...["v0.8.0-rc.", "v0.8.0-rc.0", "v0.8.0-rc.01", "v0.8.0-rc.20-extra"].map(tag => release(tag)),
  ])
  assert.equal(result.tag, "v0.8.0-rc.10")
  assert.equal(result.channel, "beta")
  assert.equal(result.downloads.macos.installer.name, platforms.macos.installer)
})

test("selects the newest release candidate across versions", () => {
  const result = selectBetaRelease([
    release("v0.8.0-rc.2"), release("v0.8.1-nightly.6"), release("v0.8.1-rc.1"), release("v0.8.0-rc.10"),
  ])
  assert.equal(result.tag, "v0.8.1-rc.1")
  assert.equal(result.channel, "beta")
  assert.equal(selectBetaRelease([release("v0.9.0-rc.1"), release("v0.10.0-rc.1")]).tag, "v0.10.0-rc.1")
})

test("skips versions before 0.8.0 and finished releases still marked as prereleases", () => {
  assert.equal(selectBetaRelease([release("v0.7.9-rc.1"), release("v0.8.1-rc.01"), release("v00.8.1-rc.1")]), null)
  const result = selectBetaRelease([release("v0.8.1-rc.2"), release("v0.8.1", { prerelease: true })])
  assert.equal(result.tag, "v0.8.1-rc.2")
  assert.equal(selectBetaRelease([release("v0.8.1-rc.9"), release("v0.8.1")]).tag, "v0.8.1")
})

test("prefers the newest finished release over any release candidate", () => {
  const result = selectBetaRelease([release("v0.8.0"), release("v0.8.1"), release("v0.8.2-rc.1"), release("v0.6.5")])
  assert.equal(result.tag, "v0.8.1")
  assert.equal(result.channel, "stable")
})

test("promotes finished 0.8.0 to stable and selects stable installers", () => {
  const result = selectBetaRelease([release("v0.8.0-rc.99"), release("v0.8.0")])
  assert.equal(result.channel, "stable")
  assert.equal(result.downloads.windows.installer.name, "Mnemo.Desktop.V2-win-x64-stable-Setup.exe")
  assert.equal(selectBetaRelease([release("v0.8.0", { prerelease: true })]), null)
})

test("does not substitute old releases when the latest release is still uploading", () => {
  const result = selectBetaRelease([release("v0.8.0-rc.1"), release("v0.8.0-rc.2", { assets: [] })])
  assert.equal(result.tag, "v0.8.0-rc.2")
  assert.deepEqual(result.downloads, {})
  assert.equal(result.checksums, undefined)
})

test("uses supplied asset URLs and excludes missing, empty, unuploaded, or foreign downloads", () => {
  const input = release("v0.8.0-rc.1")
  input.assets = input.assets.filter(a => a.name !== platforms.linux.installer)
  input.assets.find(a => a.name === platforms.windows.portable).size = 0
  input.assets.find(a => a.name === platforms.macos.installer).state = "starter"
  input.assets.find(a => a.name === platforms.macos.portable).browser_download_url = "https://example.com/file"
  const windows = input.assets.find(a => a.name === platforms.windows.installer)
  windows.browser_download_url += "?download=1"
  const result = selectBetaRelease([input])
  assert.equal(result.downloads.windows.installer.url, windows.browser_download_url)
  assert.equal(result.downloads.windows.portable, undefined)
  assert.equal(result.downloads.linux.installer, undefined)
  assert.equal(result.downloads.macos, undefined)
})

test("handles an unpublished beta without linking the old stable or a nightly", () => {
  assert.equal(selectBetaRelease([release("v0.6.5"), release("v0.8.0-nightly.10")]), null)
  assert.equal(selectBetaRelease([]), null)
  assert.throws(() => selectBetaRelease({ message: "rate limited" }))
})

test("detects desktop OS without treating mobile or ChromeOS as compatible desktops", () => {
  assert.equal(detectPlatform("Mozilla/5.0 (Windows NT 10.0; Win64; x64)"), "windows")
  assert.equal(detectPlatform("Mozilla/5.0 (X11; Linux x86_64)"), "linux")
  assert.equal(detectPlatform("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"), "macos")
  assert.equal(detectPlatform("Mozilla/5.0 (Linux; Android 14)"), "mobile")
  assert.equal(detectPlatform("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)"), "mobile")
  assert.equal(detectPlatform("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", "MacIntel", 5), "mobile")
  assert.equal(detectPlatform("Mozilla/5.0 (X11; CrOS x86_64)"), "unknown")
  assert.equal(detectPlatform(""), "unknown")
})
