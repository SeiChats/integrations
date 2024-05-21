import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { getMessagesSentBy } from '../api/contract/contractFunctions'
import MessagePreview from '../components/MessagePreview'
import RouteContext from '../providers/ContextProvider'

interface Message {
  messageId: string
  message: {
    message: string
  }
  receiver: string
  timestamp: string
}

const SentMessages = function () {
  const { address } = useContext(RouteContext)
  const { data, isPending } = useQuery({
    queryFn: getMessagesSentBy,
    queryKey: [address, 'messages'],
  })
  console.log(data)
  return (
    <div className=" row-start-2 row-end-4 min-h-full relative">
      {isPending ? (
        <img className="absolute inset-[50%_50%_auto_auto] w-16 block translate-y--1/2 translate-x-1/2" />
      ) : (
        data?.map((message: Message) => (
          <MessagePreview
            key={message.messageId}
            message={message.message.message}
            recipient={message.receiver}
            timeStamp={+message.timestamp}
          />
        ))
      )}
    </div>
  )
}

export default SentMessages
