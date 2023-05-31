import { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = {
  icon: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function IconButton({ className, icon }: Props) {
  return <button className={`btn ${className}`}>{icon}</button>
}
