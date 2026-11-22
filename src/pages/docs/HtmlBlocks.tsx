import { createElement, useMemo } from 'react'

/**
 * Renders trusted article HTML (from src/content/docs) as top level elements, so rules
 * like `.doc > p` keep matching. Only our own build time content goes through here.
 */
export function HtmlBlocks({ html }: { html: string }) {
  const blocks = useMemo(() => {
    const doc = new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html')
    return [...doc.body.children].map((el, i) => {
      const props: Record<string, unknown> = {
        key: i,
        dangerouslySetInnerHTML: { __html: el.innerHTML },
      }
      for (const a of el.attributes) props[a.name === 'class' ? 'className' : a.name] = a.value
      return createElement(el.tagName.toLowerCase(), props)
    })
  }, [html])
  return blocks
}
