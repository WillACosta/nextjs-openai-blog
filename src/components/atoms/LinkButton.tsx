import Link from 'next/link'

type ButtonComponentProps = {
  label: string
  url: string,
  className?: string
}

export default function LinkButton({ label, url, className }: ButtonComponentProps) {
  return (
    <Link className={`btn ${className}`} href={url}>
      {label}
    </Link>
  )
}
