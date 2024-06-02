import nftBG from '../assets/nft-bg.png'
import SearchBar from '../components/SearchBar'
import seichatLogo from '../assets/seichat.svg'

import { useContext, useEffect } from 'react'
import RouteContext from '../providers/ContextProvider'
import { useQuery } from '@tanstack/react-query'
import { getMessagesReceivedBy } from '../api/contract/contractFunctions'
import MessagePreview from '../components/MessagePreview'
import { Message } from './SentMessages'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'

const Messages = function () {
  const { navigateTo, address, setData } = useContext(RouteContext)
  const { data, isLoading } = useQuery({
    queryFn: getMessagesReceivedBy,
    queryKey: [address, 'messages-received'],
  })

  useEffect(() => {
    setData({ fromReceivedMessages: true })
  }, [])

  return (
    <>
      <SearchBar />
      <div
        className={twMerge(
          'h-full grid',
          (isLoading || data?.length === 0) && 'place-content-center'
        )}
      >
        {isLoading ? (
          <motion.img
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{
              repeat: Infinity,
              duration: 0.5,
              repeatType: 'reverse',
            }}
            src={seichatLogo}
            className="w-16 block"
          />
        ) : data?.length == 0 ? (
          <>
            <div>
              <img src={nftBG} alt="no messages" />
              <p className="capitalize font-semibold mt-4 mb-3">
                no new messages
              </p>
              <button
                className="bg-black capitalize outline-none border-none rounded-full px-5 py-3 cursor-pointer text-sm"
                onClick={() => navigateTo('send-message')}
              >
                send message
              </button>
            </div>
          </>
        ) : (
          <div>
            {data
              ?.sort((a: Message, b: Message) => +b.timestamp - +a.timestamp)
              .map((message: Message) => (
                <MessagePreview
                  key={message.messageId}
                  messageId={message.messageId}
                  message={message.message.message}
                  recipient={message.sender}
                  timeStamp={+message.timestamp}
                  isRead={message.isRead}
                />
              ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Messages
