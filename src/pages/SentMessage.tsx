import {
  getMessagesReceivedBy,
  getMessagesSentBy,
} from '@/api/contract/contractFunctions'
import Footer from '@/components/Footer'
import RouteContext from '@/providers/ContextProvider'
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { Message as MessageInterface } from './SentMessages'
import MessageCard from '@/components/MessageCard'
import { FileData } from './SendMessage'

interface MessageReply {
  receiver: string
  sender: string
  timestamp: string
  decryptedreply: {
    id: string
    message: string
    attachments: FileData[]
  }
}
const SentMessage = function () {
  const {
    address,
    route,
    prevRoute,
    data: contextData,
  } = useContext(RouteContext)

  const fromSent = prevRoute === 'sent-messages' || contextData.fromSentMessages

  const { data, isSuccess } = useQuery({
    queryFn: fromSent ? getMessagesSentBy : getMessagesReceivedBy,
    queryKey: [address, fromSent ? 'messages-sent' : 'messages-received'],
  })

  const [messageReplies, setMessageReplies] = useState<MessageReply[]>([])

  const messageId = route.split('/')[1]
  const messageData = data?.find(
    (message: MessageInterface) => message.messageId === messageId
  )

  useEffect(() => {
    if (!isSuccess) return
    if (!messageData?.replies?.length) return
    ;(async () => {
      const replies = await Promise.all(messageData.replies)
      setMessageReplies(replies)
    })()
  }, [isSuccess])

  return (
    <div className="grid h-full grid-rows-[1fr_auto]">
      <div className="max-h-[467px] overflow-y-auto overflow__bar">
        <MessageCard
          wallet={messageData?.sender}
          timestamp={+messageData?.timestamp}
          message={messageData?.message.message}
          attachments={messageData?.message.attachments}
          subject={messageData?.message.subject}
          isMain
        />
        {messageReplies.map(reply => {
          console.log(reply)
          const message = reply.decryptedreply

          return (
            <MessageCard
              key={message.id}
              wallet={reply.sender}
              timestamp={+reply.timestamp}
              message={message.message}
              attachments={message.attachments}
            />
          )
        })}
      </div>
      <Footer />
    </div>
  )
}

export default SentMessage
