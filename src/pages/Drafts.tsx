import nftBG from '../assets/nft-bg.png'
import SearchBar from '../components/SearchBar'
import seichatLogo from '../assets/seichat.svg'

import { useContext } from 'react'
import RouteContext from '../providers/ContextProvider'
import { useQuery } from '@tanstack/react-query'
import MessagePreview from '../components/MessagePreview'
import { Message } from './SentMessages'
import { twMerge } from 'tailwind-merge'
import { getAllDecryptedMessagesByTag } from '@/api'

const Drafts = function () {
  const { navigateTo, address } = useContext(RouteContext)
  const { data, isLoading } = useQuery({
    queryFn: function () {
      return getAllDecryptedMessagesByTag({ tag: 'draft', address: address! })
    },
    queryKey: [address, 'drafts'],
  })

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
          <img
            src={seichatLogo}
            className="absolute inset-[50%_50%_auto_auto] w-16 block translate-y--1/2 translate-x-1/2"
          />
        ) : data?.length === 0 ? (
          <>
            <div>
              <img src={nftBG} alt="no messages" />
              <p className="capitalize font-semibold mt-4 mb-3 text-center">
                no drafts
              </p>
              <button
                className="bg-black mx-auto block capitalize outline-none border-none rounded-full px-5 py-3 cursor-pointer text-sm"
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
                  key={message.id}
                  messageId={message.id}
                  message={message.message.message}
                  recipient={message.receiver}
                  timeStamp={
                    new Date(message.message.createdAt).getTime() / 1000
                  }
                  isRead={message.isRead}
                  isDraft
                />
              ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Drafts
