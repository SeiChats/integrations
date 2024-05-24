import { motion } from 'framer-motion'
import checkedIcon from '../assets/checked.svg'
import { convertTimestampToTime } from '../utils/utils'
import { useContext } from 'react'
import RouteContext from '../providers/ContextProvider'

interface MessagePreviewProps {
  message: string
  messageId: string
  recipient: string
  timeStamp: number
}

const MessagePreview = function ({
  message,
  messageId,
  recipient,
  timeStamp,
}: MessagePreviewProps) {
  const time = convertTimestampToTime(timeStamp)
  const { navigateTo } = useContext(RouteContext)
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      onClick={() => navigateTo(`messages/${messageId}`)}
      className="grid grid-cols-[auto_1fr_auto] grid-rows-[repeat(2,_auto)] gap-x-4 gap-y-2 items-center bg-[#191D1D] p-3 mb-3 rounded-lg cursor-pointer"
    >
      <div className="bg-[#D9D9D9] w-4 h-4 rounded-[50%] row-start-1 row-span-1 col-start-1 col-span-1" />
      <div className="flex items-center gap-4 row-start-1 row-span-1 col-start-2 col-span-1">
        <p className="font-semibold">
          {recipient.slice(0, 5)}***{recipient.slice(37)}
        </p>
        <p className="bg-[#EFFCF4] text-[#507A5F] capitalize p-1 rounded text-[0.7rem] font-semibold">
          trusted
        </p>
      </div>
      <time className="row-start-1 row-span-1 col-start-3 col-span-1">
        {time}
      </time>
      <p
        className="row-start-2 row-span-1 break-words col-start-2 col-span-1 lowercase max-w-[214px]"
        title={message}
      >
        {message.length > 30 ? `${message.slice(0, 30)}...` : message}
      </p>
      <img
        src={checkedIcon}
        alt="sent"
        className="row-start-2 row-span-1 col-start-3 col-span-1 ml-auto"
      />
    </motion.div>
  )
}

export default MessagePreview
