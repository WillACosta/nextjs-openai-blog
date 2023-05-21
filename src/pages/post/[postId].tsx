'use client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useParams } from 'next/navigation';

export default function PostDetail() {
  const params = useParams()
  return <h1>Post Detail {params['postId']}</h1>;
}

export const getServerSideProps = withPageAuthRequired({})