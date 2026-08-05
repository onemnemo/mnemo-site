/**
 * One-off asset processing for generated art.
 *
 * Currently: cuts the footer "peek" pose (row 2, column 3) out of the 3x3
 * Soma pose sheet and trims its background, then prints the dimensions of
 * key images so components can declare accurate width/height.
 *
 * Run with: node scripts/process-assets.mjs
 */
import sharp from "sharp"

const posesPath = "public/soma/poses.png"
const meta = await sharp(posesPath).metadata()
const cellW = Math.floor(meta.width / 3)
const cellH = Math.floor(meta.height / 3)

// Pose 6 (peeking over a ledge) lives in row 2, column 3 of the sheet. Only
// the bottom half of the cell is taken so the neighboring pose stays out of
// frame; the artwork sits flush with the cell's bottom edge by design.
// Two passes because sharp orders trim before extract within one pipeline.
const half = Math.floor(cellH / 2)
const cell = await sharp(posesPath)
  .extract({ left: cellW * 2, top: cellH + half, width: cellW, height: cellH - half })
  .toBuffer()
const trimmed = await sharp(cell).trim({ threshold: 25 }).toBuffer()

// Key the cream generation background to transparent so cutouts sit on any
// canvas without a visible box. Flat art has hard ink edges, so a simple
// per-pixel distance test against the corner color is enough.
const { data, info } = await sharp(trimmed)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })
const bg = [data[info.width * 4 - 4], data[info.width * 4 - 3], data[info.width * 4 - 2]]
for (let i = 0; i < data.length; i += 4) {
  const dist = Math.max(
    Math.abs(data[i] - bg[0]),
    Math.abs(data[i + 1] - bg[1]),
    Math.abs(data[i + 2] - bg[2])
  )
  if (dist < 14) data[i + 3] = 0
}
await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toFile("public/soma/peek.png")

/**
 * Feature-card spot illustrations: trim margins, key out the generation
 * background, and downscale. Originals stay untouched as the source of
 * truth; processed copies land in public/illos/spots/.
 */
import { mkdirSync } from "node:fs"

mkdirSync("public/illos/spots", { recursive: true })
const spots = ["notes", "flashcards", "mindmaps", "search", "dashboard", "themes"]

for (const name of spots) {
  const trimmedSpot = await sharp(`public/illos/${name}.png`)
    .trim({ threshold: 25 })
    .toBuffer()
  const { data, info } = await sharp(trimmedSpot)
    .resize({ width: 512, height: 512, fit: "inside" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const corner = [data[0], data[1], data[2]]
  for (let i = 0; i < data.length; i += 4) {
    const dist = Math.max(
      Math.abs(data[i] - corner[0]),
      Math.abs(data[i + 1] - corner[1]),
      Math.abs(data[i + 2] - corner[2])
    )
    if (dist < 14) data[i + 3] = 0
  }
  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(`public/illos/spots/${name}.png`)
}

/**
 * Doodle sheets: both are 5x5 grids. Each cell becomes its own transparent
 * PNG (background keyed against the cell's corner pixel), named row-major:
 * dark-01 .. dark-25 and light-01 .. light-25. Cells are not trimmed, so
 * every doodle from one sheet shares the same dimensions, which keeps the
 * rendering component simple.
 */
mkdirSync("public/illos/doodles", { recursive: true })

async function cutSheet(sheetName, outPrefix) {
  const path = `public/illos/${sheetName}.png`
  const m = await sharp(path).metadata()
  const cw = Math.floor(m.width / 5)
  const ch = Math.floor(m.height / 5)
  // Inset each cell so a neighboring doodle's tip cannot bleed into the cut.
  const ix = Math.floor(cw * 0.06)
  const iy = Math.floor(ch * 0.06)
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const index = String(row * 5 + col + 1).padStart(2, "0")
      const buf = await sharp(path)
        .extract({
          left: col * cw + ix,
          top: row * ch + iy,
          width: cw - ix * 2,
          height: ch - iy * 2,
        })
        .toBuffer()
      const { data, info } = await sharp(buf)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true })
      const cellBg = [data[0], data[1], data[2]]
      for (let i = 0; i < data.length; i += 4) {
        const dist = Math.max(
          Math.abs(data[i] - cellBg[0]),
          Math.abs(data[i + 1] - cellBg[1]),
          Math.abs(data[i + 2] - cellBg[2])
        )
        if (dist < 16) data[i + 3] = 0
      }
      await sharp(data, {
        raw: { width: info.width, height: info.height, channels: 4 },
      })
        .png()
        .toFile(`public/illos/doodles/${outPrefix}-${index}.png`)
    }
  }
  return { width: cw - ix * 2, height: ch - iy * 2 }
}

const darkCell = await cutSheet("doodles-dark", "dark")
const lightCell = await cutSheet("doodles-light", "light")

/**
 * 404 scene: key the cream background so the TV and Soma sit directly on
 * the page canvas instead of inside a visible box. Threshold is tighter
 * than elsewhere (12) because Soma's near-white body is close to the
 * background color.
 */
{
  const { data, info } = await sharp("public/soma/404.png")
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const bg = [data[0], data[1], data[2]]
  for (let i = 0; i < data.length; i += 4) {
    const dist = Math.max(
      Math.abs(data[i] - bg[0]),
      Math.abs(data[i + 1] - bg[1]),
      Math.abs(data[i + 2] - bg[2])
    )
    if (dist < 12) data[i + 3] = 0
  }
  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile("public/soma/404-clean.png")
}

/**
 * Footer "grip" pose: Soma hanging onto the torn paper edge.
 *
 * This one cannot use the corner-distance keying above. Its body fill is the
 * same cream as the generation background (248,241,234 vs 249,240,232), and
 * the head has no bottom outline because it is meant to be cut off by the
 * paper edge, so a per-pixel test erases the body along with the background.
 * Instead the background is flood filled inward from the top and side edges:
 * only cream that is connected to the frame is cleared, and the body keeps
 * its fill because the ink outline blocks the fill. The bottom edge is never
 * seeded, since that is the open cut where the character meets the paper.
 */
const grip = await (async () => {
  const src = "public/soma/peek-grip.png"
  const raw = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const bg = [raw.data[0], raw.data[1], raw.data[2]]

  // The artwork must be cropped to its own bottom before filling. With the
  // empty rows left on, the fill runs underneath the open head and back up
  // into it, erasing the body.
  let artworkBottom = 0
  for (let y = 0; y < raw.info.height; y++) {
    for (let x = 0; x < raw.info.width; x++) {
      const i = (y * raw.info.width + x) * 4
      const d = Math.max(
        Math.abs(raw.data[i] - bg[0]),
        Math.abs(raw.data[i + 1] - bg[1]),
        Math.abs(raw.data[i + 2] - bg[2])
      )
      if (d >= 12) {
        artworkBottom = y
        break
      }
    }
  }

  const { data, info } = await sharp(src)
    .extract({
      left: 0,
      top: 0,
      width: raw.info.width,
      height: artworkBottom + 1,
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const { width: W, height: H } = info

  const isBgLike = (i) =>
    Math.max(
      Math.abs(data[i * 4] - bg[0]),
      Math.abs(data[i * 4 + 1] - bg[1]),
      Math.abs(data[i * 4 + 2] - bg[2])
    ) < 12

  const seen = new Uint8Array(W * H)
  const stack = []
  const push = (x, y) => {
    const i = y * W + x
    if (!seen[i] && isBgLike(i)) {
      seen[i] = 1
      stack.push(i)
    }
  }
  for (let x = 0; x < W; x++) push(x, 0)
  for (let y = 0; y < H; y++) {
    push(0, y)
    push(W - 1, y)
  }
  while (stack.length) {
    const i = stack.pop()
    const x = i % W
    const y = (i / W) | 0
    if (x > 0) push(x - 1, y)
    if (x < W - 1) push(x + 1, y)
    if (y > 0) push(x, y - 1)
    if (y < H - 1) push(x, y + 1)
  }
  for (let i = 0; i < W * H; i++) if (seen[i]) data[i * 4 + 3] = 0

  // Trim to the opaque bounds so the component can position by exact edges.
  let minX = W
  let maxX = -1
  let minY = H
  let maxY = -1
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (data[(y * W + x) * 4 + 3]) {
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  }

  // The footer offset has to align the paper edge with the head's cut, so
  // report where each drawn element ends, measured from the trimmed top.
  const isInk = (i) => data[i] < 110 && data[i + 1] < 110 && data[i + 2] < 110
  const isGill = (i) =>
    data[i] > 190 && data[i + 1] < 190 && data[i + 2] < 190 && data[i + 3] > 0
  const lowestWhere = (test, fromFrac, toFrac) => {
    let lowest = -1
    for (let x = Math.round(W * fromFrac); x < Math.round(W * toFrac); x++) {
      for (let y = H - 1; y >= 0; y--) {
        const i = (y * W + x) * 4
        if (data[i + 3] && test(i)) {
          if (y > lowest) lowest = y
          break
        }
      }
    }
    return lowest - minY
  }

  await sharp(data, { raw: { width: W, height: H, channels: 4 } })
    .extract({
      left: minX,
      top: minY,
      width: maxX - minX + 1,
      height: maxY - minY + 1,
    })
    .png()
    .toFile("public/soma/peek-grip-clean.png")

  return {
    width: maxX - minX + 1,
    height: maxY - minY + 1,
    headOutlineBottom: lowestWhere(isInk, 0.42, 0.58),
    leftPawBottom: lowestWhere(isInk, 0.12, 0.26),
    rightPawBottom: lowestWhere(isInk, 0.62, 0.76),
    leftGillBottom: lowestWhere(isGill, 0.02, 0.22),
    rightGillBottom: lowestWhere(isGill, 0.78, 0.98),
  }
})()

/**
 * Download-state poses: a 1x3 sheet (idle / alert / sent) cut for the
 * crossfade on the download page. All three outputs share one crop window
 * (the union of their opaque bounds within equal-width cells), so the
 * character stays registered when the images are stacked and faded; feet
 * were generated on a shared baseline, and this preserves it. Backgrounds
 * are flood filled from the cell borders like the grip pose, since the
 * bodies are near the background cream and only the ink outline separates
 * them.
 */
const downloadStates = await (async () => {
  const src = "public/soma/download-states.png"
  const names = ["dl-idle", "dl-alert", "dl-sent"]
  const meta = await sharp(src).metadata()
  const cellW = Math.floor(meta.width / 3)

  const cells = []
  for (let index = 0; index < names.length; index++) {
    const { data, info } = await sharp(src)
      .extract({ left: cellW * index, top: 0, width: cellW, height: meta.height })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })
    const { width: W, height: H } = info
    const bg = [data[0], data[1], data[2]]

    const isBgLike = (i) =>
      Math.max(
        Math.abs(data[i * 4] - bg[0]),
        Math.abs(data[i * 4 + 1] - bg[1]),
        Math.abs(data[i * 4 + 2] - bg[2])
      ) < 12
    const seen = new Uint8Array(W * H)
    const stack = []
    const push = (x, y) => {
      const i = y * W + x
      if (!seen[i] && isBgLike(i)) {
        seen[i] = 1
        stack.push(i)
      }
    }
    for (let x = 0; x < W; x++) {
      push(x, 0)
      push(x, H - 1)
    }
    for (let y = 0; y < H; y++) {
      push(0, y)
      push(W - 1, y)
    }
    while (stack.length) {
      const i = stack.pop()
      const x = i % W
      const y = (i / W) | 0
      if (x > 0) push(x - 1, y)
      if (x < W - 1) push(x + 1, y)
      if (y > 0) push(x, y - 1)
      if (y < H - 1) push(x, y + 1)
    }
    for (let i = 0; i < W * H; i++) if (seen[i]) data[i * 4 + 3] = 0
    cells.push({ data, W, H })
  }

  // Register the poses on their feet rather than on the sheet grid. The
  // generator does not keep the character in the same spot per cell, so a
  // shared sheet-space crop makes the body jump between states. Feet are
  // the one anchor that plausibly stays planted while posture changes, so
  // each pose is measured (bounding box, feet baseline, and the horizontal
  // centroid of the feet region) and re-composited so all feet centers land
  // on the same canvas point. Remaining head and lean movement then reads
  // as the character moving, not the image shifting.
  const measured = cells.map(({ data, W, H }) => {
    let minX = Infinity
    let maxX = -1
    let minY = Infinity
    let maxY = -1
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (data[(y * W + x) * 4 + 3]) {
          if (x < minX) minX = x
          if (x > maxX) maxX = x
          if (y < minY) minY = y
          if (y > maxY) maxY = y
        }
      }
    }
    // Feet region: the bottom 12% of the pose. The centroid ignores props
    // like the clipboard, which sit at torso height and would bias a
    // whole-body center.
    const feetTop = maxY - Math.round((maxY - minY) * 0.12)
    let sumX = 0
    let count = 0
    for (let y = feetTop; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        if (data[(y * W + x) * 4 + 3]) {
          sumX += x
          count++
        }
      }
    }
    return { minX, maxX, minY, maxY, feetCenterX: sumX / count }
  })

  const maxLeft = Math.ceil(
    Math.max(...measured.map((m) => m.feetCenterX - m.minX))
  )
  const maxRight = Math.ceil(
    Math.max(...measured.map((m) => m.maxX - m.feetCenterX))
  )
  const maxTall = Math.max(...measured.map((m) => m.maxY - m.minY))
  const outW = maxLeft + maxRight + 1
  const outH = maxTall + 1

  for (let index = 0; index < names.length; index++) {
    const { data, W } = cells[index]
    const m = measured[index]
    const cropW = m.maxX - m.minX + 1
    const cropH = m.maxY - m.minY + 1
    const crop = Buffer.alloc(cropW * cropH * 4)
    for (let y = 0; y < cropH; y++) {
      const srcStart = ((m.minY + y) * W + m.minX) * 4
      data.copy(crop, y * cropW * 4, srcStart, srcStart + cropW * 4)
    }
    await sharp({
      create: {
        width: outW,
        height: outH,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([
        {
          input: crop,
          raw: { width: cropW, height: cropH, channels: 4 },
          left: maxLeft - Math.round(m.feetCenterX - m.minX),
          top: outH - cropH,
        },
      ])
      .png()
      .toFile(`public/soma/${names[index]}.png`)
  }
  return { width: outW, height: outH }
})()

const report = { darkCell, lightCell, grip, downloadStates }
for (const [name, path] of [
  ["peek", "public/soma/peek.png"],
  ["hero", "public/illos/hero.png"],
  ["notFound", "public/soma/404.png"],
]) {
  const m = await sharp(path).metadata()
  report[name] = { width: m.width, height: m.height }
}
console.log(JSON.stringify(report))
