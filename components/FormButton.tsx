import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface FormButtonProps {
  children: ReactNode
  isLoading?: boolean
  className?: string
}

const FormButton = function ({
  children,
  isLoading,
  className,
  ...buttonProps
}: FormButtonProps & ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      disabled={isLoading}
      className={twMerge(
        'bg-black text-white block w-full px-5 py-4 capitalize rounded-xl shadow-custom',
        className,
        isLoading && 'bg-[#5B5B5B1A] cursor-not-allowed'
      )}
      {...buttonProps}
    >
      {children}
    </button>
  )
}

export default FormButton
