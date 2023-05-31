import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Cross1Icon } from '@radix-ui/react-icons'
import { PropsWithChildren, ReactNode, useState } from 'react'

type ModalComponentProps = {
  title: string
  description: string
  trigger: ReactNode
} & PropsWithChildren

export function useModalComponent() {
  let [isOpen, setIsOpen] = useState(false);

  return {
    isOpen, setIsOpen
  }
}

export default function ModalComponent({children, title, description, trigger}: ModalComponentProps) {
  const {isOpen, setIsOpen} = useModalComponent()

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        {trigger}
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal >
        <DialogPrimitive.Overlay className='fixed inset-0 z-20 bg-black/50' />

        <DialogPrimitive.Content className='fixed z-50 w-[95vw] max-w-md rounded-lg p-4 md:w-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white focus:outline-none focus-visible:ring focus-visible:ring-purple-400 focus-visible:ring-opacity-75'>

          <DialogPrimitive.Title className='text-sm font-bold text-gray-900'>
            {title}
          </DialogPrimitive.Title>

          <DialogPrimitive.Description className='mt-2 text-sm font-normal text-gray-700'>
            {description}
          </DialogPrimitive.Description>

          {children}

          <DialogPrimitive.Close
                className='absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1 focus:outline-none focus-visible:ring focus-visible:ring-purple-300 focus-visible:ring-opacity-75'>
                <Cross1Icon className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400" />
              </DialogPrimitive.Close>
        </DialogPrimitive.Content>

      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
