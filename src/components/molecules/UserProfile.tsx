import { useUser } from '@auth0/nextjs-auth0/client'
import { Cross1Icon } from '@radix-ui/react-icons'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import AvatarComponent from '../atoms/AvatarComponent'

export default function UserProfile() {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  function getUserName() {
    const userName = user?.name
    if (userName?.includes('@')) return userName.charAt(0)
    return userName?.charAt(0) || ''
  }

  const userNameInitials = getUserName()
  const userPicture = user?.picture || ''

  return (
    <div className='relative inline-block text-left'>
      <PopoverPrimitive.Root>
        <PopoverPrimitive.Anchor>
          <PopoverPrimitive.Trigger>
            <AvatarComponent
              role='button'
              imageURL={userPicture}
              altText={`represents your profile picture`}
              fallBackValue={userNameInitials}
            />
          </PopoverPrimitive.Trigger>
        </PopoverPrimitive.Anchor>

        <PopoverPrimitive.Content
          align='center'
          sideOffset={4}
          arrowPadding={22}
          className='radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down z-50 w-48 rounded-lg p-4 shadow-md md:w-56 bg-purple-100 mr-2'
        >
          <PopoverPrimitive.Arrow className='fill-purple-100' />
          <span>logout</span>

          <PopoverPrimitive.Close
            className='absolute top-3 right-4 inline-flex items-center justify-center rounded-full p-1 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
            aria-label='Close'
          >
            <Cross1Icon className='h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400' />
          </PopoverPrimitive.Close>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Root>
    </div>
  )
}
