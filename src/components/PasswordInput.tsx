import { EyeIcon } from './icons'

import { ComponentPropsWithoutRef, useState } from 'react'

interface PasswordInputProps {
  label: string
  htmlFor: string
}

const PasswordInput = function ({
  label,
  htmlFor,
  ...inputProps
}: PasswordInputProps & ComponentPropsWithoutRef<'input'>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  return (
    <label htmlFor={htmlFor} className="capitalize block relative mb-6">
      {label}
      <input
        type={isPasswordVisible ? 'text' : 'password'}
        name={htmlFor}
        {...inputProps}
        className="bg-transparent border border-white/20 shadow-custom mt-4 pl-4 pr-12 py-3 rounded-xl w-full"
      />
      <EyeIcon
        visible={isPasswordVisible}
        onClick={() => setIsPasswordVisible(prev => !prev)}
        className="absolute w-6 inset-[auto_1em_0.8em_auto] cursor-pointer"
      />
    </label>
  )
}

export default PasswordInput
