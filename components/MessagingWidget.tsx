'use client'
import attachmentIcon from '../icons/attachment.svg'
import galleryIcon from '../icons/gallery.svg'
import arrow from '../icons/arrow.svg'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

interface MessagingWidgetProps {
  className?: string
}

const MessagingWidget = function ({ className }: MessagingWidgetProps) {
  return (
    <div
      className={twMerge(
        'flex items-center bg-[#191D1D] p-2 rounded-full gap-4 w-max',
        className
      )}
    >
      <Image src={galleryIcon} alt="upload" className="cursor-pointer w-4" />
      <Image
        src={attachmentIcon}
        alt="attachment"
        className="cursor-pointer w-4"
      />
      <div className="w-[1px] h-4 bg-[#D9D9D91A]" />
      <div className="p-2 rounded-[50%] bg-[#CF3A46] cursor-pointer">
        <Image src={arrow} alt="send" />
      </div>
    </div>
  )
}

export default MessagingWidget
