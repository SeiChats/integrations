'use client'

import Image from 'next/image'
import { AnimatePresence, motion, useAnimate } from 'framer-motion'

import caret from '../icons/caret.svg'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface DropDownProps {
  label: string
  htmlFor: string
  placeholder: string
  options: string[]
}

const DropDown = function ({
  label,
  htmlFor,
  placeholder,
  options,
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string>()
  const [scope, animate] = useAnimate()

  const uniqueOptions = new Array(...new Set(options))

  useEffect(() => {
    if (isOpen) {
      animate('img', { rotate: '180deg' })
      return
    }
    animate('img', { rotate: 0 })
  }, [isOpen])

  return (
    <label htmlFor={htmlFor} className="block relative capitalize mb-6">
      {label}
      <input
        type="text"
        value={selectedOption}
        readOnly
        tabIndex={-1}
        name={htmlFor}
        placeholder={placeholder}
        className="bg-transparent border border-white/20 outline-none shadow-custom mt-4 pl-4 pr-12 py-4 rounded-xl w-full cursor-pointer"
        onClick={() => {
          setIsOpen(prev => !prev)
        }}
      />
      <div ref={scope} className="w-max absolute inset-[auto_1em_1.6em_auto]">
        <Image src={caret} alt="drop down arrow" className="w-4" />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-[#141717] border border-white/20 shadow-custom py-4 rounded-xl absolute w-full z-10"
            initial={{ y: '-18%', opacity: 0 }}
            animate={{ y: '3%', opacity: 1 }}
            exit={{ y: '-18%', opacity: 0 }}
            transition={{ type: 'tween' }}
          >
            {uniqueOptions.map(option => (
              <p
                key={option}
                className={twMerge(
                  'hover:bg-[#434545] px-8 py-3 cursor-pointer',
                  selectedOption === option && 'bg-[#434545]/30'
                )}
                onClick={() => {
                  if (selectedOption === option) return
                  setSelectedOption(option)
                  setIsOpen(false)
                }}
              >
                {option}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </label>
  )
}

export default DropDown
