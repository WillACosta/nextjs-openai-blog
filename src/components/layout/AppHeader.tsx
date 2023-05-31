import UserProfile from '../molecules/UserProfile'

export function AppHeader() {
  return (
    <div className='container mx-auto py-4 flex gap-10 items-center justify-end px-5 md:px-1'>
      <p>home</p>
      <p>generate</p>
      <UserProfile />
    </div>
  )
}
