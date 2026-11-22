import { createContext, useContext } from 'react'

export const OpenSearchContext = createContext<() => void>(() => {})
export const useOpenSearch = () => useContext(OpenSearchContext)

const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)
/** The keyboard hint shown on search buttons. */
export const SEARCH_KEYS = isMac ? '⌘ K' : 'Ctrl K'
