import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

import caretIcon from '../assets/caret.svg'
import RouteContext from '../providers/ContextProvider'
import {
  getMessagesReceivedBy,
  getMessagesSentBy,
} from '../api/contract/contractFunctions'
import { Message as MessageInterface } from './SentMessages'
import { formatTimestamp, getCurrentTime12HrFormat } from '../utils/utils'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import SentDocumentCard from '../components/SentDocument'
import { FileData } from './SendMessage'

const Message = function () {
  const { route, address, navigateTo, prevRoute } = useContext(RouteContext)
  const fromInbox = prevRoute === 'inbox'

  const { data } = useQuery({
    queryFn: fromInbox ? getMessagesReceivedBy : getMessagesSentBy,
    queryKey: [address, fromInbox ? 'messages-received' : 'messages-sent'],
  })

  const messageId = route.split('/')[1]
  const messageData = data?.find(
    (message: MessageInterface) => message.messageId === messageId
  )

  return (
    <div className="h-full grid grid-rows-[repeat(4,_auto)_1fr_auto]">
      <header className="grid grid-cols-[auto_auto_1fr_auto] grid-rows-[repeat(2,_auto)] items-center gap-x-3 gap-y-1 mt-2 mb-3">
        <img
          src={caretIcon}
          alt="back"
          onClick={() => navigateTo(-1)}
          className="rotate-90 row-start-1 row-span-2 col-start-1 col-span-1 cursor-pointer"
        />
        <div className="row-start-1 row-span-2 col-start-2 col-span-1 w-12 h-12 bg-[#1777BC] rounded-[50%]" />
        <div className="flex items-center gap-4 row-start-1 row-span-1 col-start-3 col-span-1">
          <p>
            {(fromInbox ? messageData.sender : messageData.receiver)?.slice(
              0,
              5
            )}
            ***
            {(fromInbox ? messageData.sender : messageData.receiver)?.slice(37)}
          </p>
          <p className="bg-[#EFFCF4] text-[#507A5F] capitalize p-1 rounded text-[0.7rem] font-semibold">
            trusted
          </p>
        </div>
        <p className="row-start-2 row-span-1 col-start-3 col-span-1 text-[0.75rem]">
          {formatTimestamp(messageData.timestamp)}
        </p>
        <p className="row-start-1 row-span-2 col-start-4 col-span-1 text-sm">
          {getCurrentTime12HrFormat()}
        </p>
      </header>
      <div className="bg-[#4A4C54] h-[1px] my-4" />
      <div className="flex items-center gap-3">
        <p className="capitalize text-[#8F8F8F] font-normal">subject:</p>
        <p className="font-semibold">{messageData.message.subject}</p>
      </div>
      <div className="bg-[#4A4C54] h-[1px] my-4" />
      <div className="max-h-[312px] overflow-y-auto overflow__bar">
        <pre className="whitespace-pre-wrap word__break break-words font-inter font-normal leading-6 block max-w-[352px]">
          {messageData.message.message}
        </pre>
        {messageData.message?.attachments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="flex flex-wrap gap-4"
          >
            {messageData.message?.attachments.map(
              (file: FileData, index: number) => (
                <SentDocumentCard
                  key={file.url + index}
                  name={file.name}
                  index={index}
                  type={file.type}
                  fileUrl={file.url}
                />
              )
            )}
          </motion.div>
        )}
      </div>
      <Footer className="mt-auto" />
    </div>
  )
}

export default Message
