import { EyeIcon } from './icons'

import { ComponentPropsWithoutRef, ReactNode, useState } from 'react'

interface PasswordInputProps {
  label: string
  htmlFor: string
  children?: ReactNode
}

const PasswordInput = function ({
  label,
  htmlFor,
  children,
  ...inputProps
}: PasswordInputProps & ComponentPropsWithoutRef<'input'>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  return (
    <label htmlFor={htmlFor} className="capitalize block relative mb-6">
      <div className="flex gap-2 items-center">
        {label}
        {children}
      </div>
      <input
        type={isPasswordVisible ? 'text' : 'password'}
        name={htmlFor}
        {...inputProps}
        className="bg-transparent border border-white/20 shadow-custom mt-4 pl-4 pr-12 py-3 rounded-xl w-full disabled:cursor-not-allowed"
      />
      <EyeIcon
        visible={isPasswordVisible}
        onClick={() => setIsPasswordVisible(prev => !prev)}
        className="absolute w-6 inset-[auto_1em_0.95em_auto] cursor-pointer"
      />
    </label>
  )
}

export default PasswordInput
