import { useUser } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'

export default function UserProfile() {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  function getUserName() {
    const userName = user?.name
    if (userName?.includes('@')) return ''
    return userName || ''
  }

  const userName = getUserName()
  const userPicture = user?.picture || ''

  return !!user ? (
    <div className='flex gap-2 items-center pb-3'>
      <div className='main-w-[50px]'>
        <Image className='rounded-full' width={50} height={50} src={userPicture} alt={userName} />
      </div>
    </div>
  ) : (
    <></>
  )
}
