import attachmentIcon from '../assets/attachment.svg'
import galleryIcon from '../assets/gallery.svg'
import arrow from '../assets/arrow.svg'
import { twMerge } from 'tailwind-merge'
import LoadingSpinner from './LoadingSpinner'

interface MessagingWidgetProps {
  className?: string
  onSend?: () => void
  disabled?: boolean
  isLoading?: boolean
}

const MessagingWidget = function ({
  className,
  onSend,
  disabled,
  isLoading,
}: MessagingWidgetProps) {
  return (
    <div
      className={twMerge(
        'flex items-center bg-[#191D1D] p-2 rounded-full gap-4 w-max',
        className
      )}
    >
      <label htmlFor="image-upload" className="cursor-pointer block">
        <img src={galleryIcon} alt="upload" className="w-4" />
        <input
          type="file"
          id="image-upload"
          name="image-upload"
          accept="image/*"
          className="hidden"
        />
      </label>
      <label htmlFor="file-upload" className="cursor-pointer block">
        <img src={attachmentIcon} alt="attachment" className="w-4" />
        <input
          type="file"
          name="file-upload"
          id="file-upload"
          className="hidden"
        />
      </label>
      <div className="w-[1px] h-4 bg-[#D9D9D91A]" />
      <button
        className={twMerge(
          'p-2 rounded-[50%] bg-[#CF3A46] cursor-pointer border-none outline-none',
          (isLoading || disabled) && 'cursor-not-allowed opacity-65'
        )}
        disabled={isLoading || disabled}
        onClick={onSend}
      >
        {isLoading ? (
          <LoadingSpinner radii={20} ringWidth={3} ringColor="#ffffff" />
        ) : (
          <img src={arrow} alt="send" />
        )}
      </button>
    </div>
  )
}

export default MessagingWidget
