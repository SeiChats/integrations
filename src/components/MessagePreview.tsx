import checkedIcon from '../assets/checked.svg'
import { convertTimestampToTime } from '../utils/utils'

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
        {recipient.slice(0, 8)}***{recipient.slice(10)}
      </p>
      <p>trusted</p>
      <time>{time}</time>
      <p>{message}</p>
      <img src={checkedIcon} alt="sent" />
    </div>
  )
}

export default MessagePreview
