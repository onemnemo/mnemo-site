/**
 * One-off asset processing: cuts, keys, and measures the artwork that
 * ships, then prints a dimension report so components can declare
 * accurate width/height.
 *
 * Run with: node scripts/process-assets.mjs
 */
import { mkdirSync } from "node:fs"

import sharp from "sharp"

/**
 * Doodle sheets: both are 5x5 grids. Each cell becomes its own transparent
 * PNG (background keyed against the cell's corner pixel), named row-major:
 * dark-01 .. dark-25 and light-01 .. light-25. Cells are not trimmed, so
 * every doodle from one sheet shares the same dimensions and the rendering
 * component needs only one size.
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
          Math.abs(data[i + 2] - cellBg[2]),
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
      Math.abs(data[i + 2] - bg[2]),
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
 * 404 scene, split into animatable layers.
 *
 * The page gives the television and the character separate idle motion, which
 * a single flat image cannot support. The two are distinct 8-connected blobs
 * in the keyed art: their bounding boxes overlap by a few pixels, but no
 * opaque pixel of one touches the other.
 *
 * Three files come out, all on the original canvas so the component can stack
 * them with `inset-0` and no offset arithmetic:
 *   404-tv.png          the television
 *   404-soma.png        the character
 *   404-screen-mask.png the screen area, as an alpha mask for the CRT overlay
 */
const notFoundLayers = await (async () => {
  const { data, info } = await sharp("public/soma/404-clean.png")
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const { width: W, height: H } = info
  const N = W * H

  const label = new Int32Array(N).fill(-1)
  const stack = new Int32Array(N)
  const comps = []
  for (let seed = 0; seed < N; seed++) {
    if (label[seed] !== -1 || data[seed * 4 + 3] <= 8) continue
    const id = comps.length
    let sp = 0
    stack[sp++] = seed
    label[seed] = id
    let count = 0
    let x0 = W
    let y0 = H
    let x1 = -1
    let y1 = -1
    while (sp > 0) {
      const i = stack[--sp]
      const x = i % W
      const y = (i / W) | 0
      count++
      if (x < x0) x0 = x
      if (x > x1) x1 = x
      if (y < y0) y0 = y
      if (y > y1) y1 = y
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx
          const ny = y + dy
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue
          const j = ny * W + nx
          if (label[j] === -1 && data[j * 4 + 3] > 8) {
            label[j] = id
            stack[sp++] = j
          }
        }
      }
    }
    comps.push({
      id,
      count,
      x0,
      y0,
      x1,
      y1,
      cx: (x0 + x1) / 2,
      cy: (y0 + y1) / 2,
    })
  }

  const bySize = [...comps].sort((a, b) => b.count - a.count)
  const [tv, soma] =
    bySize[0].cx < bySize[1].cx
      ? [bySize[0], bySize[1]]
      : [bySize[1], bySize[0]]

  // Interior details (the vents, the dial, Soma's glasses) are separate
  // components because keying cut them away from the shape they sit on. Give
  // each to whichever main shape's box contains it, falling back to the nearer
  // center for the sliver where the two boxes overlap.
  const owner = new Int32Array(comps.length)
  for (const c of comps) {
    const has = (p) =>
      c.cx >= p.x0 && c.cx <= p.x1 && c.cy >= p.y0 && c.cy <= p.y1
    const inTv = has(tv)
    const inSoma = has(soma)
    if (inTv && !inSoma) owner[c.id] = tv.id
    else if (inSoma && !inTv) owner[c.id] = soma.id
    else {
      const d = (p) => (c.cx - p.cx) ** 2 + (c.cy - p.cy) ** 2
      owner[c.id] = d(tv) <= d(soma) ? tv.id : soma.id
    }
  }

  const writeLayer = async (ownerId, file) => {
    const out = Buffer.alloc(N * 4)
    for (let i = 0; i < N; i++) {
      const l = label[i]
      if (l === -1 || owner[l] !== ownerId) continue
      out[i * 4] = data[i * 4]
      out[i * 4 + 1] = data[i * 4 + 1]
      out[i * 4 + 2] = data[i * 4 + 2]
      out[i * 4 + 3] = data[i * 4 + 3]
    }
    await sharp(out, { raw: { width: W, height: H, channels: 4 } })
      .png()
      .toFile(file)
  }
  await writeLayer(tv.id, "public/soma/404-tv.png")
  await writeLayer(soma.id, "public/soma/404-soma.png")

  // Screen mask. The color bars are the only strongly saturated area on the
  // television, so they seed the shape, but they stop short of the black
  // test-pattern stripe down the right of the screen, which carries no
  // saturation. Each row is therefore marched outward from the bars until it
  // reaches the bezel; marching row by row cannot leak along the television's
  // black outline the way a flood fill would.
  //
  // Membership is tested against the cabinet blob alone, not everything
  // assigned to it: the tuning dial is a separate component (keying punched it
  // out of the body) and its red ring is saturated enough to seed a bogus row
  // only ~20px from the screen's left edge, too close for any gap rule to
  // separate.
  const isScreenBlob = (i) => label[i] === tv.id
  const sat = (r, g, b) => {
    const mx = Math.max(r, g, b)
    return mx === 0 ? 0 : (mx - Math.min(r, g, b)) / mx
  }
  // A row stops at the bezel's muted teal or at the cabinet's white. Testing
  // for white too keeps rows from escaping where the bezel thins to an
  // antialiased line; the cost is that the white patch in the test pattern
  // also stops a row early, which the edge fit below corrects.
  const isBezelOrBody = (x, y) => {
    const o = (y * W + x) * 4
    const [r, g, b] = [data[o], data[o + 1], data[o + 2]]
    if (r > 205 && g > 205 && b > 205) return true
    return (
      g > r + 8 && b > r + 8 && sat(r, g, b) > 0.12 && Math.max(r, g, b) > 120
    )
  }

  const spans = new Map()
  for (let y = tv.y0; y <= tv.y1; y++) {
    // Saturated pixels in this row, grouped into clusters. The tuning dial on
    // the left of the cabinet is saturated too, so the row's outermost
    // saturated pixels would stretch the span from the dial across the white
    // body. The screen's bars are by far the widest cluster, so pick that one.
    const clusters = []
    for (let x = tv.x0; x <= tv.x1; x++) {
      const i = y * W + x
      if (!isScreenBlob(i)) continue
      const o = i * 4
      const mx = Math.max(data[o], data[o + 1], data[o + 2])
      if (mx <= 70 || sat(data[o], data[o + 1], data[o + 2]) <= 0.25) continue
      const last = clusters[clusters.length - 1]
      // The black "404" readout and the dark test stripe interrupt the bars,
      // so allow a generous gap before starting a new cluster.
      if (last && x - last[1] <= 60) last[1] = x
      else clusters.push([x, x])
    }
    if (!clusters.length) continue
    let [l, r] = clusters.reduce((a, b) => (b[1] - b[0] > a[1] - a[0] ? b : a))
    if (r - l < 40) continue
    // March cap in pixels, generous because the widest cluster can sit to one
    // side of the black "404" readout, leaving most of the screen still to
    // cross. The left/right edge fit below is what contains a runaway row.
    const MARCH = 420
    for (
      let n = 0;
      n < MARCH && r + 1 <= tv.x1 && !isBezelOrBody(r + 1, y);
      n++
    )
      r++
    for (
      let n = 0;
      n < MARCH && l - 1 >= tv.x0 && !isBezelOrBody(l - 1, y);
      n++
    )
      l--
    // Inset so the overlay cannot spill over the bezel's antialiased edge.
    if (r - l > 8) spans.set(y, [l + 4, r - 4])
  }

  // The rows above approximate the screen but are not airtight: where the
  // bezel thins, a row can escape and run across the cabinet to the dial. The
  // screen is a convex quadrilateral, so rather than patch those rows, fit a
  // straight line to each of its four edges and keep the intersection of the
  // four half planes. A quad cannot leak, and the least-squares fit rejects
  // outliers, so stray rows are outvoted by the hundreds of correct ones and
  // a row that stopped early on the white patch cannot narrow an edge.
  const fitEdge = (samples) => {
    let pts = samples
    let line = { a: 0, b: 0 }
    for (let pass = 0; pass < 4; pass++) {
      const n = pts.length
      const mt = pts.reduce((s, p) => s + p[0], 0) / n
      const mv = pts.reduce((s, p) => s + p[1], 0) / n
      let num = 0
      let den = 0
      for (const [t, v] of pts) {
        num += (t - mt) * (v - mv)
        den += (t - mt) ** 2
      }
      const b = den === 0 ? 0 : num / den
      line = { a: mv - b * mt, b }
      const res = pts.map(([t, v]) => Math.abs(line.a + line.b * t - v))
      const med = [...res].sort((x, y) => x - y)[res.length >> 1]
      const kept = pts.filter((_, i) => res[i] <= Math.max(2.5, med * 3))
      if (kept.length < 12 || kept.length === pts.length) break
      pts = kept
    }
    return line
  }
  // Each edge is sampled away from the corners: near the top of the screen a
  // row's left bound is the slanted top edge rather than the left edge, and
  // including those rows tips the left edge's fit over.
  const band = (values, lo, hi) => {
    const s = [...new Set(values)].sort((a, b) => a - b)
    return [s[Math.floor(s.length * lo)], s[Math.floor(s.length * hi)]]
  }
  const rows = [...spans.keys()].sort((a, b) => a - b)
  const [rowLo, rowHi] = band(rows, 0.15, 0.85)
  const core = rows.filter((y) => y >= rowLo && y <= rowHi)
  const L = fitEdge(core.map((y) => [y, spans.get(y)[0]]))
  const R = fitEdge(core.map((y) => [y, spans.get(y)[1]]))

  // Take the intercepts from a quantile of the samples rather than from the
  // fit. Rows blocked by the white patch stop short of the right edge, and a
  // least-squares intercept splits the difference between those and the rows
  // that made it; a high quantile sits on the true edge while still ignoring
  // the rare row that escaped entirely.
  const quantile = (values, q) => {
    const s = [...values].sort((a, b) => a - b)
    return s[Math.min(s.length - 1, Math.max(0, Math.floor(s.length * q)))]
  }
  L.a = quantile(
    core.map((y) => spans.get(y)[0] - L.b * y),
    0.15,
  )
  R.a = quantile(
    core.map((y) => spans.get(y)[1] - R.b * y),
    0.85,
  )

  // Column extents, measured only inside the left/right edges so a row that
  // escaped through the bezel cannot claim columns out on the cabinet.
  const colTop = new Map()
  const colBottom = new Map()
  for (const [y, [dl, dr]] of spans) {
    const l = Math.max(dl, Math.ceil(L.a + L.b * y))
    const r = Math.min(dr, Math.floor(R.a + R.b * y))
    for (let x = l; x <= r; x++) {
      if (!colTop.has(x) || y < colTop.get(x)) colTop.set(x, y)
      if (!colBottom.has(x) || y > colBottom.get(x)) colBottom.set(x, y)
    }
  }
  const [colLo, colHi] = band([...colTop.keys()], 0.15, 0.85)
  const inBand = (m) =>
    [...m.entries()].filter(([x]) => x >= colLo && x <= colHi)

  // The screen's top and bottom edges are near parallel, so the bottom
  // borrows the top's slope and only its offset is measured. Fitting the
  // bottom freely picks up rows along the grey band that carry too little
  // saturation to be detected across the full width, tipping its slope the
  // wrong way.
  const T = fitEdge(inBand(colTop))
  const B = {
    b: T.b,
    a: quantile(
      inBand(colBottom).map(([x, y]) => y - T.b * x),
      0.85,
    ),
  }
  T.a = quantile(
    inBand(colTop).map(([x, y]) => y - T.b * x),
    0.15,
  )

  const INSET = 5
  const mask = Buffer.alloc(N * 4)
  let minY = H
  let maxY = -1
  for (let y = tv.y0; y <= tv.y1; y++) {
    const lx = Math.ceil(L.a + L.b * y + INSET)
    const rx = Math.floor(R.a + R.b * y - INSET)
    for (let x = Math.max(0, lx); x <= Math.min(W - 1, rx); x++) {
      if (y < T.a + T.b * x + INSET || y > B.a + B.b * x - INSET) continue
      // The fitted quad can bulge slightly past a corner; requiring the pixel
      // to belong to the cabinet blob trims the overshoot.
      if (!isScreenBlob(y * W + x)) continue
      const o = (y * W + x) * 4
      mask[o] = 255
      mask[o + 1] = 255
      mask[o + 2] = 255
      mask[o + 3] = 255
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }
  await sharp(mask, { raw: { width: W, height: H, channels: 4 } })
    .png({ palette: true, colors: 2 })
    .toFile("public/soma/404-screen-mask.png")

  return {
    canvas: { width: W, height: H },
    tv: { x0: tv.x0, y0: tv.y0, x1: tv.x1, y1: tv.y1 },
    soma: { x0: soma.x0, y0: soma.y0, x1: soma.x1, y1: soma.y1 },
    screen: { top: minY, bottom: maxY },
  }
})()

/**
 * Footer "grip" pose: Soma hanging onto the torn paper edge.
 *
 * The corner-distance keying above does not work here: the body fill is the
 * same cream as the source background (248,241,234 vs 249,240,232), and the
 * head has no bottom outline because the paper edge is meant to cut it off,
 * so a per-pixel test erases the body along with the background. The
 * background is instead flood filled inward from the top and side edges, so
 * only cream connected to the frame is cleared and the ink outline protects
 * the body fill. The bottom edge is never seeded: that is the open cut where
 * the character meets the paper.
 */
const grip = await (async () => {
  const src = "public/soma/peek-grip.png"
  const raw = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const bg = [raw.data[0], raw.data[1], raw.data[2]]

  // Crop to the artwork's own bottom before filling. With the empty rows left
  // on, the fill runs underneath the open head and back up into it, erasing
  // the body.
  let artworkBottom = 0
  for (let y = 0; y < raw.info.height; y++) {
    for (let x = 0; x < raw.info.width; x++) {
      const i = (y * raw.info.width + x) * 4
      const d = Math.max(
        Math.abs(raw.data[i] - bg[0]),
        Math.abs(raw.data[i + 1] - bg[1]),
        Math.abs(raw.data[i + 2] - bg[2]),
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
      Math.abs(data[i * 4 + 2] - bg[2]),
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

  // The footer offset aligns the paper edge with the head's cut, so report
  // where each drawn element ends, in pixels from the trimmed top.
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
 * crossfade on the download page. All three outputs share one canvas size, so
 * the character stays registered when the images are stacked and faded.
 * Backgrounds are flood filled from the cell borders like the grip pose, since
 * the bodies are near the background cream and only the ink outline separates
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
      .extract({
        left: cellW * index,
        top: 0,
        width: cellW,
        height: meta.height,
      })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })
    const { width: W, height: H } = info
    const bg = [data[0], data[1], data[2]]

    const isBgLike = (i) =>
      Math.max(
        Math.abs(data[i * 4] - bg[0]),
        Math.abs(data[i * 4 + 1] - bg[1]),
        Math.abs(data[i * 4 + 2] - bg[2]),
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

  // Register the poses on their feet rather than on the sheet grid: the
  // character does not sit in the same spot in every cell, so a shared
  // sheet-space crop makes the body jump between states. The feet stay
  // planted while posture changes, so each pose is measured (bounding box,
  // feet baseline, horizontal centroid of the feet region) and re-composited
  // with all feet centers on the same canvas point. Remaining head and lean
  // movement then reads as the character moving, not the image shifting.
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
    // Feet region: the bottom 12% of the pose's height. Restricting the
    // centroid to it ignores props like the clipboard, which sit at torso
    // height and would bias a whole-body center.
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
    Math.max(...measured.map((m) => m.feetCenterX - m.minX)),
  )
  const maxRight = Math.ceil(
    Math.max(...measured.map((m) => m.maxX - m.feetCenterX)),
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

/**
 * Graduation cap toss: an 8-frame sprite strip for the science-grad-toss
 * keyframes in globals.css.
 *
 * public/illos/science/grad-strip.png is a hand-finished source asset, not an
 * output: it is keyed and horizontally registered by hand because the
 * character's fill is the exact background cream and several raised-arm
 * outlines have hairline gaps that let a flood fill hollow the body out. Any
 * keying pass here would undo that retouching, so the strip is measured only,
 * never written.
 */
const gradToss = await (async () => {
  const m = await sharp("public/illos/science/grad-strip.png").metadata()
  return { frameWidth: m.width / 8, frameHeight: m.height, frames: 8 }
})()

/**
 * InkEdge squid (5x2 grid) and scene-6 sleeper (1x4 strip) sprite sheets.
 * Source assets like grad-strip.png: already keyed, measured only, never
 * written. The sleeper's crop window (rows 276..604, the drawn content plus
 * padding) is documented in night-doze.tsx.
 */
const spriteSheets = await (async () => {
  const squid = await sharp(
    "public/illos/science/squid-sprite-sheet.png",
  ).metadata()
  const night = await sharp(
    "public/illos/science/night-sprite-sheet.png",
  ).metadata()
  return {
    squid: {
      frameWidth: squid.width / 5,
      frameHeight: squid.height / 2,
      frames: 10,
    },
    night: {
      frameWidth: night.width / 4,
      frameHeight: night.height,
      frames: 4,
    },
  }
})()

const report = {
  darkCell,
  lightCell,
  grip,
  downloadStates,
  notFoundLayers,
  gradToss,
  spriteSheets,
}
for (const [name, path] of [["notFound", "public/soma/404.png"]]) {
  const m = await sharp(path).metadata()
  report[name] = { width: m.width, height: m.height }
}
console.log(JSON.stringify(report))
