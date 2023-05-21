import { UserProvider } from "@auth0/nextjs-auth0/client";

import Link from "next/link";

export default function Home() {
  return (
    <div>
      <UserProvider>
        <Link href="/api/auth/login">Login</Link>
      </UserProvider>
    </div>
  );
}
