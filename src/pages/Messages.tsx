import newMessageImg from '../assets/new-message.svg'
import nftBG from '../assets/nft-bg.png'
import SearchBar from '../components/SearchBar'
import seichatLogo from '../assets/seichat.svg'

import { useContext } from 'react'
import RouteContext from '../providers/ContextProvider'
import { useQuery } from '@tanstack/react-query'
import { getMessagesReceivedBy } from '../api/contract/contractFunctions'
import MessagePreview from '../components/MessagePreview'
import { Message } from './SentMessages'
import { twMerge } from 'tailwind-merge'

const Messages = function () {
  const { navigateTo, address } = useContext(RouteContext)
  const { data, isLoading } = useQuery({
    queryFn: getMessagesReceivedBy,
    queryKey: [address, 'messages-received'],
  })

  console.log(data)

  return (
    <>
      <SearchBar />
      <div
        className={twMerge(
          'h-full grid',
          (isLoading || data.length === 0) && 'place-content-center'
        )}
      >
        {isLoading ? (
          <img
            src={seichatLogo}
            className="absolute inset-[50%_50%_auto_auto] w-16 block translate-y--1/2 translate-x-1/2"
          />
        ) : data.length === 0 ? (
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
            <div
              onClick={() => navigateTo('send-message')}
              className="bg-[#CF3A46] cursor-pointer p-2 w-max rounded-[50%] z-10 absolute
        inset-[auto_0_1em_auto]"
            >
              <img src={newMessageImg} alt="new message" />
            </div>
          </>
        ) : (
          <div>
            {data?.map((message: Message) => (
              <MessagePreview
                key={message.messageId}
                message={message.message.message}
                recipient={message.receiver}
                timeStamp={+message.timestamp}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Messages
