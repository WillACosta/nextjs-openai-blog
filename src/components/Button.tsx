import Link from 'next/link'

type ButtonComponentProps = {
  label: string
  url: string
}

export default function Button({ label, url }: ButtonComponentProps) {
  return (
    <Link className="btn" href={url}>
      {label}
    </Link>
  )
}
