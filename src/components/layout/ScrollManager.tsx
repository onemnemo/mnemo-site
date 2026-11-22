import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * On navigation, scrolls to the hash target once it renders (articles load lazily),
 * or to the top for a new page.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    let tries = 0
    let raf = 0
    const find = () => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView()
      else if (tries++ < 60) raf = requestAnimationFrame(find)
    }
    find()
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash, key])
  return null
}
