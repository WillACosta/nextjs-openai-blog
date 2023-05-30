import UserProfile from './UserProfile'

export default function AppHeader() {
  return (
    <div className='container mx-auto py-4 flex gap-10 items-center justify-end'>
      <p>home</p>
      <p>generate</p>
      <UserProfile />
    </div>
  )
}
