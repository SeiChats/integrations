import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

import seichatLogo from '../assets/seichat.svg'
import { getMessagesSentBy } from '../api/contract/contractFunctions'
import MessagePreview from '../components/MessagePreview'
import RouteContext from '../providers/ContextProvider'
import nftBG from '../assets/nft-bg.png'

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
  const { address, setData, navigateTo } = useContext(RouteContext)

  const { data, isLoading } = useQuery({
    queryFn: getMessagesSentBy,
    queryKey: [address, 'messages-sent'],
  })

  useEffect(() => {
    setData({ fromSentMessages: true })
  }, [])

  return (
    <div
      className={twMerge(
        'row-start-2 row-end-4 min-h-full relative overflow-y-auto overflow-x-hidden overflow__bar',
        data?.length === 0 && 'grid place-content-center'
      )}
    >
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
      ) : data?.length == 0 ? (
        <>
          <div>
            <img src={nftBG} alt="no messages" />
            <p className="capitalize font-semibold mt-4 mb-3 text-center">
              no messages
            </p>
            <button
              className="bg-black capitalize outline-none border-none rounded-full px-5 py-3 cursor-pointer text-sm block mx-auto"
              onClick={() => navigateTo('send-message')}
            >
              send message
            </button>
          </div>
        </>
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
