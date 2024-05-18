import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import LoadingSpinner from './LoadingSpinner'

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
        'bg-black text-white w-full px-5 py-4 capitalize rounded-xl shadow-custom flex items-center gap-4 justify-center disabled:bg-[#333333] transition-colors',
        className,
        isLoading && 'bg-[#5B5B5B1A] cursor-not-allowed'
      )}
      {...buttonProps}
    >
      {children}
      {isLoading && (
        <LoadingSpinner radii={25} ringWidth={3} ringColor="#ffffff" />
      )}
    </button>
  )
}

export default FormButton
