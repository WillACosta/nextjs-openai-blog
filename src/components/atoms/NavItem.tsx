import Link from "next/link"

type NavItemProps = {
  label: string
  href: string
  active: boolean
}

export default function NavItem({ active, href, label }: NavItemProps) {
  return (
    <Link className={`link ${active ? 'text-purple-400' : ''}`} href={href}>
      {label}
    </Link>
  )
}