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
  .extract({
    left: cellW * 2,
    top: cellH + half,
    width: cellW,
    height: cellH - half,
  })
  .toBuffer()
const trimmed = await sharp(cell).trim({ threshold: 25 }).toBuffer()

// Key the cream generation background to transparent so cutouts sit on any
// canvas without a visible box. Flat art has hard ink edges, so a simple
// per-pixel distance test against the corner color is enough.
const { data, info } = await sharp(trimmed)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })
const bg = [
  data[info.width * 4 - 4],
  data[info.width * 4 - 3],
  data[info.width * 4 - 2],
]
for (let i = 0; i < data.length; i += 4) {
  const dist = Math.max(
    Math.abs(data[i] - bg[0]),
    Math.abs(data[i + 1] - bg[1]),
    Math.abs(data[i + 2] - bg[2]),
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
const spots = [
  "notes",
  "flashcards",
  "mindmaps",
  "search",
  "dashboard",
  "themes",
]

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
      Math.abs(data[i + 2] - corner[2]),
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
 * a single flat image cannot support. Splitting is safe here because the two
 * are already distinct 8-connected blobs in the keyed art: their bounding
 * boxes overlap by a few pixels, but no opaque pixel of one touches the other.
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

  // Interior details — the vents, the dial, Soma's glasses — are separate
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
  // saturation at all. Each row is therefore marched outward from the bars
  // until it reaches the bezel. Marching row by row cannot leak along the
  // television's black outline the way a flood fill would, and to the side of
  // the bars there is no cyan bar to be mistaken for the bezel's muted teal.
  // Strictly the cabinet blob, not everything assigned to it: the tuning dial
  // is a separate component (keying punched it out of the body) and its red
  // ring is saturated enough to seed a bogus row only ~20px from the screen's
  // left edge, which is too close for any gap rule to separate.
  const isScreenBlob = (i) => label[i] === tv.id
  const sat = (r, g, b) => {
    const mx = Math.max(r, g, b)
    return mx === 0 ? 0 : (mx - Math.min(r, g, b)) / mx
  }
  // A row stops at the bezel's muted teal or at the cabinet's white. Testing
  // for white as well is what keeps rows from escaping through the places
  // where the bezel thins to an antialiased line; the cost is that the white
  // patch in the test pattern also stops a row early, which the edge fit
  // below corrects.
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
    // the left of the cabinet is saturated too, so taking the row's outermost
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
    // The cap is generous because the widest cluster can sit to one side of
    // the black "404" readout, leaving most of the screen still to cross. The
    // left/right edge fit below is what actually contains a runaway row.
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

  // The rows above are a good approximation but not airtight: where the bezel
  // thins, a row can escape and run across the cabinet to the dial. The screen
  // is a convex quadrilateral, so rather than patch those rows, fit a straight
  // line to each of its four edges and keep the intersection of the four half
  // planes. A quad cannot leak, and fitting with outlier rejection means the
  // stray rows are voted down by the hundreds of correct ones.
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
  // Fit all four edges and keep the intersection of their half planes. Going
  // through lines rather than using the detected rows directly fixes both
  // failure modes at once: a row that stopped early on the white patch is
  // outvoted, and a row that escaped cannot widen a straight edge.
  //
  // Each edge is sampled away from the corners. Near the top of the screen a
  // row's left bound is the slanted top edge rather than the left edge, so
  // including those rows would tip the left edge's fit over.
  const band = (values, lo, hi) => {
    const s = [...new Set(values)].sort((a, b) => a - b)
    return [s[Math.floor(s.length * lo)], s[Math.floor(s.length * hi)]]
  }
  const rows = [...spans.keys()].sort((a, b) => a - b)
  const [rowLo, rowHi] = band(rows, 0.15, 0.85)
  const core = rows.filter((y) => y >= rowLo && y <= rowHi)
  const L = fitEdge(core.map((y) => [y, spans.get(y)[0]]))
  const R = fitEdge(core.map((y) => [y, spans.get(y)[1]]))

  // Take the intercepts from a quantile of the samples rather than the fit.
  // Rows blocked by the white patch stop short of the right edge, and a
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

  // The screen is close enough to a rectangle that its top and bottom edges
  // are near parallel, so the bottom borrows the top's slope and only its
  // offset is measured. Fitting the bottom freely picks up the rows along the
  // grey band that carry too little saturation to be detected across the full
  // width, which tips its slope the wrong way entirely.
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
      // Final guard: the quad is fitted, so it can bulge a little past a
      // corner. Everything outside the cabinet is transparent, so requiring
      // the pixel to be part of the cabinet blob trims any such overshoot.
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
 * /science scene art.
 *
 * These pieces carry soft glows and ground shadows, so the binary keying
 * used elsewhere would cut every soft edge into a hard cream fringe. Soft
 * border keying instead: the background is flood filled inward from the
 * frame through pixels that stay close to the background color, and each
 * visited pixel's alpha becomes its distance from the background, so
 * gradients (the lamp cone, the shadows) fade out exactly as drawn.
 * Interiors sealed by ink outlines are never visited and keep full alpha.
 */
async function softBorderKey(
  data,
  W,
  H,
  { walk = 40, dead = 10, radius = 4 } = {},
) {
  // Distances are measured on a blurred copy: the generator leaves paper
  // grain and compression ringing around ink edges, and on the raw pixels
  // that noise either survives as an opaque speckle halo or blocks the
  // flood. Blurring averages it back toward the background; the output
  // pixels themselves stay untouched, so the art is not softened.
  const blurred = await sharp(data, {
    raw: { width: W, height: H, channels: 4 },
  })
    .blur(1.5)
    .raw()
    .toBuffer()
  const bg = [blurred[0], blurred[1], blurred[2]]
  const rawBg = [data[0], data[1], data[2]]
  const distAt = (i) =>
    Math.max(
      Math.abs(blurred[i * 4] - bg[0]),
      Math.abs(blurred[i * 4 + 1] - bg[1]),
      Math.abs(blurred[i * 4 + 2] - bg[2]),
    )
  // Blur cuts both ways: it denoises grain, but it also softens a thin ink
  // stroke enough that the flood can walk straight through it and hollow
  // out the shape it seals (the raised arms in the graduation frames). So
  // walking additionally requires the RAW pixel to not be definite ink;
  // grain never gets that dark, thin outlines always do.
  const rawDistAt = (i) =>
    Math.max(
      Math.abs(data[i * 4] - rawBg[0]),
      Math.abs(data[i * 4 + 1] - rawBg[1]),
      Math.abs(data[i * 4 + 2] - rawBg[2]),
    )
  // The ink guard alone cannot stop a leak where the outline itself has a
  // hairline gap: past the gap, a near-white body fill passes every
  // background test and the whole shape floods hollow (the raised-arm
  // graduation frames). So the flood walks around DILATED ink: gaps
  // narrower than about twice the radius read as sealed. The dilation
  // would leave a fringe of unkeyed background hugging every outline, so
  // afterwards the flood boundary relaxes outward the same number of
  // steps without the dilation constraint; through a genuine gap that
  // advances only a few harmless pixels.
  const RADIUS = radius
  const bgLike = (i) => distAt(i) < walk && rawDistAt(i) < 55
  const ink = new Uint8Array(W * H)
  for (let i = 0; i < W * H; i++) if (rawDistAt(i) >= 55) ink[i] = 1
  const dilated = new Uint8Array(W * H)
  {
    const rowHit = new Uint8Array(W * H)
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        for (let dx = -RADIUS; dx <= RADIUS; dx++) {
          const nx = x + dx
          if (nx >= 0 && nx < W && ink[y * W + nx]) {
            rowHit[y * W + x] = 1
            break
          }
        }
      }
    }
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        for (let dy = -RADIUS; dy <= RADIUS; dy++) {
          const ny = y + dy
          if (ny >= 0 && ny < H && rowHit[ny * W + x]) {
            dilated[y * W + x] = 1
            break
          }
        }
      }
    }
  }

  const seen = new Uint8Array(W * H)
  const stack = []
  const push = (x, y) => {
    const i = y * W + x
    if (!seen[i] && bgLike(i) && !dilated[i]) {
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

  // Relax: reclaim the fringe the dilation held back.
  let frontier = []
  for (let i = 0; i < W * H; i++) if (seen[i]) frontier.push(i)
  for (let step = 0; step < RADIUS; step++) {
    const next = []
    for (const i of frontier) {
      const x = i % W
      const y = (i / W) | 0
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx
          const ny = y + dy
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue
          const j = ny * W + nx
          if (!seen[j] && bgLike(j)) {
            seen[j] = 1
            next.push(j)
          }
        }
      }
    }
    frontier = next
  }
  // Dead zone under the ramp so residual grain inside the walked region
  // drops to fully transparent instead of a faint milky veil.
  for (let i = 0; i < W * H; i++) {
    if (!seen[i]) continue
    const d = distAt(i)
    data[i * 4 + 3] =
      d <= dead
        ? 0
        : Math.min(255, Math.round(((d - dead) / (walk - dead)) * 255))
  }
}

/**
 * Label 8-connected opaque components and hand each to a callback that
 * decides whether to erase it. Shared by the despeckle pass, the slide's
 * star removal, and the graduation cells' neighbor-fragment cleanup.
 */
function eraseComponents(data, W, H, shouldErase) {
  const N = W * H
  const label = new Int32Array(N).fill(-1)
  const stack = new Int32Array(N)
  for (let seed = 0; seed < N; seed++) {
    if (label[seed] !== -1 || data[seed * 4 + 3] <= 8) continue
    let sp = 0
    stack[sp++] = seed
    label[seed] = 1
    const comp = {
      pixels: [],
      r: 0,
      g: 0,
      b: 0,
      minX: W,
      maxX: -1,
      sumX: 0,
    }
    while (sp > 0) {
      const i = stack[--sp]
      comp.pixels.push(i)
      comp.r += data[i * 4]
      comp.g += data[i * 4 + 1]
      comp.b += data[i * 4 + 2]
      const x = i % W
      const y = (i / W) | 0
      comp.sumX += x
      if (x < comp.minX) comp.minX = x
      if (x > comp.maxX) comp.maxX = x
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx
          const ny = y + dy
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue
          const j = ny * W + nx
          if (label[j] === -1 && data[j * 4 + 3] > 8) {
            label[j] = 1
            stack[sp++] = j
          }
        }
      }
    }
    if (shouldErase(comp)) {
      for (const i of comp.pixels) data[i * 4 + 3] = 0
    }
  }
}

/**
 * Residual grain that the raw-ink guard kept out of the flood survives as
 * tiny opaque islands; anything this small is noise, never artwork (the
 * smallest legitimate marks, motion ticks and sparkles, run to hundreds
 * of pixels at generation resolution).
 */
function despeckle(data, W, H, minSize = 50) {
  eraseComponents(data, W, H, (comp) => comp.pixels.length < minSize)
}

/**
 * Soften the keyed silhouette by blurring only the alpha channel one
 * pixel's worth. The flood key decides per pixel, which leaves a slightly
 * jagged, hand-cut edge on curved outlines; a small feather reads as
 * clean antialiasing without visibly shrinking the art.
 */
async function featherAlpha(data, W, H, sigma = 1) {
  const alpha = Buffer.alloc(W * H)
  for (let i = 0; i < W * H; i++) alpha[i] = data[i * 4 + 3]
  // extractChannel pins the output back to one channel: sharp silently
  // converts single-channel raw input to RGB during the blur.
  const blurred = await sharp(alpha, {
    raw: { width: W, height: H, channels: 1 },
  })
    .blur(sigma)
    .extractChannel(0)
    .raw()
    .toBuffer()
  for (let i = 0; i < W * H; i++) data[i * 4 + 3] = blurred[i]
}

/** Opaque bounding box, padded and clamped. */
function paddedBounds(data, W, H, pad = 8) {
  let x0 = W
  let y0 = H
  let x1 = -1
  let y1 = -1
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (data[(y * W + x) * 4 + 3] > 8) {
        if (x < x0) x0 = x
        if (x > x1) x1 = x
        if (y < y0) y0 = y
        if (y > y1) y1 = y
      }
    }
  }
  return {
    left: Math.max(0, x0 - pad),
    top: Math.max(0, y0 - pad),
    width: Math.min(W - 1, x1 + pad) - Math.max(0, x0 - pad) + 1,
    height: Math.min(H - 1, y1 + pad) - Math.max(0, y0 - pad) + 1,
  }
}

const science = await (async () => {
  const out = {}
  const arts = [
    // The generator baked a yellow star into the slide even though the
    // page's live SVG spark takes exactly that spot, so it gets erased
    // (isolated blob, yellow-dominant). The stars in rescue, web, and
    // night are physically attached to props and stay: they read as the
    // spark drawn in the artwork's own language.
    { src: "slide", out: "slide", dropStar: true },
    // rescue is DELIBERATELY absent: rescue-well.png is hand-finished in
    // Photoshop (2026-08-05) and is now a source asset, not an output.
    // Same rule as grad-strip.png below: never key it again.
    { src: "the-web", out: "web" },
    { src: "night", out: "night" },
  ]
  for (const art of arts) {
    const { data, info } = await sharp(`public/illos/science/${art.src}.png`)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })
    const { width: W, height: H } = info
    await softBorderKey(data, W, H)
    despeckle(data, W, H)

    if (art.dropStar) {
      // The star is small and holds a solid block of saturated yellow; its
      // dark outline drags any whole-component mean toward neutral, so the
      // test counts distinctly yellow pixels instead of averaging.
      eraseComponents(data, W, H, (comp) => {
        if (comp.pixels.length >= W * H * 0.05) return false
        let yellow = 0
        for (const i of comp.pixels) {
          if (
            data[i * 4] > 200 &&
            data[i * 4 + 1] > 150 &&
            data[i * 4 + 2] < 140
          ) {
            yellow++
          }
        }
        return yellow / comp.pixels.length > 0.2
      })
    }

    await featherAlpha(data, W, H)
    const bounds = paddedBounds(data, W, H)
    await sharp(data, { raw: { width: W, height: H, channels: 4 } })
      .extract(bounds)
      .png()
      .toFile(`public/illos/science/${art.out}-clean.png`)
    out[art.out] = { width: bounds.width, height: bounds.height }
  }
  return out
})()

/**
 * Graduation cap toss: an 8-frame sprite strip for the science-grad-toss
 * keyframes in globals.css.
 *
 * DELIBERATELY NOT GENERATED HERE. public/illos/science/grad-strip.png is
 * hand-finished in Photoshop and is a source asset, not an output. The
 * automatic key could not handle this sheet: the character's fill is the
 * exact background cream and several raised-arm outlines have hairline
 * gaps, so the flood reached inside and hollowed the body out, and the
 * frames also needed manual horizontal registration. Running a keying
 * pass over it would undo that retouching. Measured only, never written.
 */
const gradToss = await (async () => {
  const m = await sharp("public/illos/science/grad-strip.png").metadata()
  return { frameWidth: m.width / 8, frameHeight: m.height, frames: 8 }
})()

/**
 * InkEdge squid (5x2 grid) and scene-6 sleeper (1x4 strip) sprite sheets.
 * Source assets like grad-strip.png: generated pre-keyed, measured only,
 * never written. The sleeper's crop window (rows 276..604, the drawn
 * content plus padding) is documented in night-doze.tsx.
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
  science,
  gradToss,
  spriteSheets,
}
for (const [name, path] of [
  ["peek", "public/soma/peek.png"],
  ["hero", "public/illos/hero.png"],
  ["notFound", "public/soma/404.png"],
]) {
  const m = await sharp(path).metadata()
  report[name] = { width: m.width, height: m.height }
}
console.log(JSON.stringify(report))
