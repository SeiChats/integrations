import Image from 'next/image'

import checkedIcon from '../icons/checked.svg'
import { convertTimestampToTime } from '@/utils/utils'

interface MessagePreviewProps {
  message: string
  recipient: string
  timeStamp: number
}

const MessagePreview = function ({
  message,
  recipient,
  timeStamp,
}: MessagePreviewProps) {
  const time = convertTimestampToTime(timeStamp)
  return (
    <div className="">
      <div />
      <p>
        {message.slice(0, 8)}***{message.slice(10)}
      </p>
      <p>trusted</p>
      <time>{time}</time>
      <p>{message}</p>
      <Image src={checkedIcon} alt="sent" />
    </div>
  )
}

export default MessagePreview
