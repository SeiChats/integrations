// 'use client'
import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface FormButtonProps {
  children: ReactNode
  loading?: boolean
  className?: string
}

const FormButton = function ({
  children,
  loading,
  className,
  ...buttonProps
}: FormButtonProps & ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      className={twMerge(
        'bg-black text-white block w-full px-5 py-4 capitalize rounded-xl shadow-custom',
        className
      )}
      {...buttonProps}
    >
      {children}
    </button>
  )
}

export default FormButton
