import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { ButtonHTMLAttributes } from "react";

type AvatarComponentProps = {
  imageURL: string
  altText: string
  fallBackValue: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function AvatarComponent({ imageURL, altText, fallBackValue, ...props }: AvatarComponentProps) {
  return (
    <AvatarPrimitive.Root {...props}
      className='rounded-full w-[45px] h-[45px] inline-flex justify-center overflow-hidden align-middle select-none'>
      <AvatarPrimitive.Image
        className='w-full h-full object-cover rounded-[inherit]'
        src={imageURL}
        alt={altText}
      />

      <AvatarPrimitive.Fallback className='flex w-full h-full items-center justify-center bg-zinc-100 text-sm' delayMs={600}>
        {fallBackValue}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}