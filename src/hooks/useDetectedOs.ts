import { useState } from 'react'
import type { Os } from '../pages/download/platforms'

interface UADataLike {
  platform?: string
  mobile?: boolean
}

/** Guesses the visitor's desktop system. Phones, tablets and unknown systems give null. */
export function detectOs(): Os | null {
  const ua = navigator.userAgent
  const uaData = (navigator as Navigator & { userAgentData?: UADataLike }).userAgentData
  const plat = uaData?.platform || navigator.platform || ''
  const mobile =
    /Android|iPhone|iPad|iPod/i.test(ua) ||
    !!uaData?.mobile ||
    (/Mac/.test(plat) && navigator.maxTouchPoints > 1)
  if (mobile) return null
  const s = plat + ua
  return /Win/i.test(s)
    ? 'win'
    : /Mac/i.test(s)
      ? 'mac'
      : /Linux|X11|CrOS/i.test(s)
        ? 'linux'
        : null
}

export function useDetectedOs(): Os | null {
  const [os] = useState(detectOs)
  return os
}
