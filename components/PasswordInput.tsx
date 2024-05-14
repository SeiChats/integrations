import Image from 'next/image'
import eyeIcon from '../icons/eye.svg'
import { ComponentPropsWithoutRef } from 'react'

interface PasswordInputProps {
  label: string
  htmlFor: string
}

const PasswordInput = function ({
  label,
  htmlFor,
  ...inputProps
}: PasswordInputProps & ComponentPropsWithoutRef<'input'>) {
  return (
    <label htmlFor={htmlFor} className="capitalize block relative mb-6">
      {label}
      <input
        type="password"
        name={htmlFor}
        {...inputProps}
        className="bg-transparent border border-white/20 shadow-custom mt-4 pl-4 pr-12 py-3 rounded-xl w-full"
      />
      <Image
        src={eyeIcon}
        alt="show password"
        className="absolute w-6 inset-[auto_1em_0.8em_auto]"
      />
    </label>
  )
}

export default PasswordInput
