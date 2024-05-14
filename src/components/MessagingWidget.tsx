import attachmentIcon from '../assets/attachment.svg'
import galleryIcon from '../assets/gallery.svg'
import arrow from '../assets/arrow.svg'
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
      <img
        src={galleryIcon}
        alt="upload"
        className="cursor-pointer w-4 block"
      />
      <img
        src={attachmentIcon}
        alt="attachment"
        className="cursor-pointer w-4 block"
      />
      <div className="w-[1px] h-4 bg-[#D9D9D91A]" />
      <div className="p-2 rounded-[50%] bg-[#CF3A46] cursor-pointer">
        <img src={arrow} alt="send" />
      </div>
    </div>
  )
}

export default MessagingWidget
