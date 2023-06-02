import { FormEvent, InputHTMLAttributes } from 'react'

type InputFieldProps = {
  onChange: (event: FormEvent<HTMLInputElement>) => void,
  placeHolder: string
} & InputHTMLAttributes<HTMLInputElement>

export default function InputField({ onChange, placeHolder, ...props }: InputFieldProps) {
  return (
    <input
      type='text'
      className='w-full rounded-lg p-4 bg-zinc-100 flex-grow-[2]'
      placeholder={placeHolder}
      onChange={onChange}
      {...props}
    />
  )
}
