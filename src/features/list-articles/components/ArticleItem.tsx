import Link from "next/link"

type ArticleItemProps = {
  id: string
  colorGrade: number
  label: string
}

export default function ArticleItem({id, colorGrade, label}: ArticleItemProps) {
  return (
   <Link href={`post/${id}`}>
     <div
      className={`h-[110px] w-full bg-purple-${colorGrade} mb-5 break-inside rounded-3xl flex justify-center items-center px-5 py-10 text-lg`}
    >
      {label}
    </div>
   </Link>
  )
}
