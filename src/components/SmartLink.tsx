import type { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

type SmartLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & { href: string }

/** Router link for paths inside the app, a plain anchor for everything else. */
export function SmartLink({ href, ...rest }: SmartLinkProps) {
  if (href.startsWith('/')) return <Link to={href} {...rest} />
  return <a href={href} {...rest} />
}
