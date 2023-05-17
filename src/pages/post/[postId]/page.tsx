'use client'
import { useParams } from 'next/navigation';

export default function PostDetail() {
  const params = useParams()
  return <h1>Post Detail {params['postId']}</h1>;
}
