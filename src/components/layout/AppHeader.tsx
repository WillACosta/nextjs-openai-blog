import { useState } from 'react'
import NavItem from '../atoms/NavItem'
import UserProfile from '../molecules/UserProfile'

const menuItems = [
  {
    label: 'home',
    href: '/home'
  },
  {
    label: 'generate',
    href: '/post/new'
  }
]

export function AppHeader() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className='container mx-auto py-4 flex gap-10 items-center justify-end px-5 md:px-1'>
      {menuItems.map(({ href, label }, index) => {
        return (
          <span
            key={label}
            onClick={() => {
              setActiveIndex(index)
            }}
          >
            <NavItem label={label} href={href} active={activeIndex === index} />
          </span>
        )
      })}

      <UserProfile />
    </div>
  )
}
