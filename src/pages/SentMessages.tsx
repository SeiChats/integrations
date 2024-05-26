import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

import seichatLogo from '../assets/seichat.svg'
import { getMessagesSentBy } from '../api/contract/contractFunctions'
import MessagePreview from '../components/MessagePreview'
import RouteContext from '../providers/ContextProvider'

export interface Message {
  messageId: string
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
  const { address } = useContext(RouteContext)
  const { data, isLoading } = useQuery({
    queryFn: getMessagesSentBy,
    queryKey: [address, 'messages-sent'],
  })

  return (
    <div className=" row-start-2 row-end-4 min-h-full relative overflow-y-auto overflow-x-hidden overflow__bar">
      {isLoading ? (
        <img
          src={seichatLogo}
          className="absolute inset-[50%_50%_auto_auto] w-16 block translate-y--1/2 translate-x-1/2"
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
