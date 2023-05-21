import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";

export default function UserProfile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const userPicture = user?.picture || '';
  const userName = user?.name;
  const userEmail = user?.email;

  return !!user ? (
    <div className="flex gap-2 items-center pb-3">
      <div className="main-w-[50px]">
        <Image className="rounded-full" width={200} height={200} src={userPicture} alt={userName!} />
      </div>

      <div>
        <div className="flex fap-1 justify-between">
          <h2>{userName}</h2>
          <Link href="/api/auth/logout">logout</Link>
        </div>

        <p>{userEmail}</p>
      </div>
    </div>
  ) : (
    <Link href="/api/auth/login">Login</Link>
  );
}
