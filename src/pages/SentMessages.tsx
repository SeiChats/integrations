import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'

import seichatLogo from '../assets/seichat.svg'
import { getMessagesSentBy } from '../api/contract/contractFunctions'
import MessagePreview from '../components/MessagePreview'
import RouteContext from '../providers/ContextProvider'
import { motion } from 'framer-motion'

export interface Message {
  messageId: string
  id: string
  isRead: boolean
  message: {
    message: string
    createdAt: Date
  }
  receiver: string
  sender: string
  timestamp: string
  tag: string
}

const SentMessages = function () {
  const { address, setData, data: contextData } = useContext(RouteContext)

  console.log(contextData)

  const { data, isLoading } = useQuery({
    queryFn: getMessagesSentBy,
    queryKey: [address, 'messages-sent'],
  })

  useEffect(() => {
    setData({ fromSentMessages: true })
  }, [])

  return (
    <div className=" row-start-2 row-end-4 min-h-full relative overflow-y-auto overflow-x-hidden overflow__bar">
      {isLoading ? (
        <motion.img
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{
            repeat: Infinity,
            duration: 0.5,
            type: 'tween',
            repeatType: 'reverse',
          }}
          src={seichatLogo}
          className="absolute inset-[45%_40%_auto_auto] w-16 block translate__center"
        />
      ) : (
        data
          ?.sort((a: Message, b: Message) => +b.timestamp - +a.timestamp)
          .map((message: Message) => (
            <MessagePreview
              key={message.messageId}
              messageId={message.messageId}
              message={message.message.message}
              recipient={message.receiver}
              timeStamp={+message.timestamp}
              isRead={message.isRead}
            />
          ))
      )}
    </div>
  )
}

export default SentMessages
