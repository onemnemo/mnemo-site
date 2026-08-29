import type { StaticImageData } from "next/image"

import dark01 from "@public/illos/doodles/dark-01.png"
import dark02 from "@public/illos/doodles/dark-02.png"
import dark03 from "@public/illos/doodles/dark-03.png"
import dark04 from "@public/illos/doodles/dark-04.png"
import dark05 from "@public/illos/doodles/dark-05.png"
import dark06 from "@public/illos/doodles/dark-06.png"
import dark07 from "@public/illos/doodles/dark-07.png"
import dark08 from "@public/illos/doodles/dark-08.png"
import dark09 from "@public/illos/doodles/dark-09.png"
import dark10 from "@public/illos/doodles/dark-10.png"
import dark11 from "@public/illos/doodles/dark-11.png"
import dark12 from "@public/illos/doodles/dark-12.png"
import dark13 from "@public/illos/doodles/dark-13.png"
import dark14 from "@public/illos/doodles/dark-14.png"
import dark15 from "@public/illos/doodles/dark-15.png"
import dark16 from "@public/illos/doodles/dark-16.png"
import dark17 from "@public/illos/doodles/dark-17.png"
import dark18 from "@public/illos/doodles/dark-18.png"
import dark19 from "@public/illos/doodles/dark-19.png"
import dark20 from "@public/illos/doodles/dark-20.png"
import dark21 from "@public/illos/doodles/dark-21.png"
import dark22 from "@public/illos/doodles/dark-22.png"
import dark23 from "@public/illos/doodles/dark-23.png"
import dark24 from "@public/illos/doodles/dark-24.png"
import dark25 from "@public/illos/doodles/dark-25.png"
import light01 from "@public/illos/doodles/light-01.png"
import light02 from "@public/illos/doodles/light-02.png"
import light03 from "@public/illos/doodles/light-03.png"
import light04 from "@public/illos/doodles/light-04.png"
import light05 from "@public/illos/doodles/light-05.png"
import light06 from "@public/illos/doodles/light-06.png"
import light07 from "@public/illos/doodles/light-07.png"
import light08 from "@public/illos/doodles/light-08.png"
import light09 from "@public/illos/doodles/light-09.png"
import light10 from "@public/illos/doodles/light-10.png"
import light11 from "@public/illos/doodles/light-11.png"
import light12 from "@public/illos/doodles/light-12.png"
import light13 from "@public/illos/doodles/light-13.png"
import light14 from "@public/illos/doodles/light-14.png"
import light15 from "@public/illos/doodles/light-15.png"
import light16 from "@public/illos/doodles/light-16.png"
import light17 from "@public/illos/doodles/light-17.png"
import light18 from "@public/illos/doodles/light-18.png"
import light19 from "@public/illos/doodles/light-19.png"
import light20 from "@public/illos/doodles/light-20.png"
import light21 from "@public/illos/doodles/light-21.png"
import light22 from "@public/illos/doodles/light-22.png"
import light23 from "@public/illos/doodles/light-23.png"
import light24 from "@public/illos/doodles/light-24.png"
import light25 from "@public/illos/doodles/light-25.png"

/**
 * Every doodle, imported rather than referenced by URL string.
 *
 * A static import resolves to a content-hashed URL and carries the file's
 * real dimensions, so re-cutting a sheet busts every cache between the
 * repo and the browser and the intrinsic size follows the new art. The
 * component used to build `/illos/doodles/${name}.png` by hand, which did
 * neither: after the sheets were re-cut, browsers and Next's own image
 * optimizer kept serving the previous, clipped drawings from cache, because
 * nothing about the URL had changed.
 *
 * Generated to cover the full 5x5 of both sheets; see scripts/process-assets.mjs.
 */
export const doodleArt = {
  "dark-01": dark01,
  "dark-02": dark02,
  "dark-03": dark03,
  "dark-04": dark04,
  "dark-05": dark05,
  "dark-06": dark06,
  "dark-07": dark07,
  "dark-08": dark08,
  "dark-09": dark09,
  "dark-10": dark10,
  "dark-11": dark11,
  "dark-12": dark12,
  "dark-13": dark13,
  "dark-14": dark14,
  "dark-15": dark15,
  "dark-16": dark16,
  "dark-17": dark17,
  "dark-18": dark18,
  "dark-19": dark19,
  "dark-20": dark20,
  "dark-21": dark21,
  "dark-22": dark22,
  "dark-23": dark23,
  "dark-24": dark24,
  "dark-25": dark25,
  "light-01": light01,
  "light-02": light02,
  "light-03": light03,
  "light-04": light04,
  "light-05": light05,
  "light-06": light06,
  "light-07": light07,
  "light-08": light08,
  "light-09": light09,
  "light-10": light10,
  "light-11": light11,
  "light-12": light12,
  "light-13": light13,
  "light-14": light14,
  "light-15": light15,
  "light-16": light16,
  "light-17": light17,
  "light-18": light18,
  "light-19": light19,
  "light-20": light20,
  "light-21": light21,
  "light-22": light22,
  "light-23": light23,
  "light-24": light24,
  "light-25": light25,
} as const satisfies Record<string, StaticImageData>

export type DoodleName = keyof typeof doodleArt
