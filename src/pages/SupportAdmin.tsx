import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

import RouteContext from '@/providers/ContextProvider'
import { getAllDecryptedMessagesByTag } from '@/api'
import nftBG from '../assets/nft-bg.png'
import MessagePreview from '@/components/MessagePreview'
import { Message } from './SentMessages'

const SupportAdmin = function () {
  const { address, seichatConfig } = useContext(RouteContext)

  // eslint-disable-next-line prefer-const
  let { data, isLoading } = useQuery({
    queryKey: ['all-messages', 'support-messages'],
    queryFn: () =>
      getAllDecryptedMessagesByTag({ tag: 'support', address: address! }),
    enabled: address!.toLowerCase() === seichatConfig!.address.toLowerCase(),
  })

  data = data
    ?.sort(
      (a, b) =>
        new Date(b.message.createdAt).getTime() -
        new Date(a.message.createdAt).getTime()
    )
    .reduce((acc, curr) => {
      if (acc.some((message: Message) => message.sender === curr.sender))
        return acc
      if (curr.sender === seichatConfig!.address.toLowerCase()) return acc
      return [...acc, curr]
    }, [])
  return (
    <>
      {isLoading || !data?.length ? (
        <div className="grid place-content-center">
          <img src={nftBG} alt="no messages" />
          <p className="capitalize mt-2 text-center text-lg">no messages</p>
        </div>
      ) : (
        <div>
          {data?.map(supportMessage => {
            let message = supportMessage.message.message

            if (supportMessage.message.attachments?.length > 0) {
              message = supportMessage.message.attachments[0].name
            }
            return (
              <MessagePreview
                key={supportMessage.id}
                message={message}
                messageId={supportMessage.id}
                recipient={supportMessage.sender}
                timeStamp={
                  new Date(supportMessage.message.createdAt).getTime() / 1000
                }
                isRead={supportMessage.isRead}
              />
            )
          })}
        </div>
      )}
    </>
  )
}

export default SupportAdmin
