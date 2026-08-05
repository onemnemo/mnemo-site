import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { ImageResponse } from "next/og"

import { siteConfig } from "@/config/site"

/**
 * The share card, generated at build time.
 *
 * A link to Mnemo used to unfurl as a bare text card: the metadata claimed
 * `summary_large_image` while supplying no image at all, which reads worse
 * than not claiming one. This is that image, and it is drawn from the same
 * parts as the site rather than illustrated separately, so a shared link
 * and the page it opens look like the same product.
 *
 * The composition is the brand in miniature: paper canvas, the wordmark,
 * the home page's own headline in the display serif, and the full canvas
 * palette as a stripe along the bottom with Soma gripping its top edge,
 * the same joke it plays on the torn edge of every page.
 *
 * Everything is embedded. Satori has no network and no access to the CSS
 * pipeline, so the logo and mascot arrive as data URIs, the fonts are read
 * off disk, and the oklch design tokens appear here as their sRGB hex
 * equivalents. Those hex values are the one duplication in this file: if a
 * canvas color changes in globals.css, it has to change here too.
 */

export const alt = `${siteConfig.name}: ${siteConfig.description}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const PAPER = "#f9f5ee"
const INK = "#271e18"
const MUTED = "#6b6157"
/** meadow, cobalt, butter, blush, coral: every canvas, in page order. */
const PALETTE = ["#9ebf5f", "#2e62c9", "#f4d576", "#fed2cd", "#cc5641"]

const asset = (path: string) => join(process.cwd(), path)

const [fraunces, geist, geistMedium, logoSvg, somaPng] = await Promise.all([
  readFile(asset("assets/fonts/Fraunces-SemiBold.ttf")),
  readFile(asset("assets/fonts/Geist-Regular.ttf")),
  readFile(asset("assets/fonts/Geist-Medium.ttf")),
  readFile(asset("public/logos/logo_full.svg"), "utf8"),
  readFile(asset("public/soma/peek-grip-clean.png")),
])

/* The wordmark ships as black paths on a transparent ground, which is the
   correct default everywhere else on the site. Here it sits on paper, so
   it is recolored to the ink token before being inlined. */
const logoUri = `data:image/svg+xml;base64,${Buffer.from(
  logoSvg.replaceAll('fill="black"', `fill="${INK}"`)
).toString("base64")}`
const somaUri = `data:image/png;base64,${somaPng.toString("base64")}`

const STRIPE_HEIGHT = 18
const BAND_HEIGHT = STRIPE_HEIGHT * PALETTE.length

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          color: INK,
          fontFamily: "Geist",
          /* Bottom padding clears the palette band, which is taken out of
             the flow so it can always sit flush on the card's edge. */
          padding: `72px 80px ${BAND_HEIGHT + 56}px`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoUri} alt="" width={272} height={40} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Fraunces",
              fontSize: 82,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Learn anything. Keep everything.
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 30,
              lineHeight: 1.4,
              color: MUTED,
              maxWidth: 780,
            }}
          >
            A real notes editor, flashcards that schedule themselves, and mind
            maps big enough to think in.
          </div>
        </div>

        {/* The palette signature, with the mascot cut off by its top edge.
            Soma is pulled out of the padded column so the stripes can run
            the full width of the card. */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: BAND_HEIGHT,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={somaUri}
            alt=""
            width={224}
            height={88}
            style={{ position: "absolute", right: 96, bottom: BAND_HEIGHT - 4 }}
          />
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            {PALETTE.map((color) => (
              <div
                key={color}
                style={{ height: STRIPE_HEIGHT, background: color }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
        { name: "Geist", data: geist, weight: 400, style: "normal" },
        { name: "Geist", data: geistMedium, weight: 500, style: "normal" },
      ],
    }
  )
}
