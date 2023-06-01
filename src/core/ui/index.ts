import toast from "react-hot-toast";

export interface ToastProps {
  message: string
  duration: number
  type: 'success' | 'error' | 'default'
}

export function handleShowToastNotification({ duration = 3000, message, type }: ToastProps) {
  const defaultPositionForToast = 'top-center'

  if (type === 'success') {
    return toast.success(message, {
      duration: duration,
      position: defaultPositionForToast,
    })
  }

  if (type === 'error') {
    return toast.success(message, {
      duration: duration,
      position: defaultPositionForToast
    })

  }

  return toast.success(message, {
    duration: duration,
    position: defaultPositionForToast
  })
}