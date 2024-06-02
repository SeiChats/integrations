import caretIcon from '../assets/caret.svg'
import { formatTimestamp } from '@/utils/utils'
import replyImg from '../assets/reply.svg'
import { useContext } from 'react'
import RouteContext from '@/providers/ContextProvider'
import { motion } from 'framer-motion'
import { FileData } from '@/pages/SendMessage'
import SentDocumentCard from './SentDocument'

interface MessageCardProps {
  wallet: string
  timestamp: number
  isMain?: boolean
  subject?: string
  message: string
  attachments: FileData[]
}

const MessageCard = function ({
  wallet,
  timestamp,
  isMain,
  subject,
  message,
  attachments,
}: MessageCardProps) {
  const { navigateTo } = useContext(RouteContext)
  return (
    <div className="bg-[#1A1D1D] p-4 rounded-3xl mb-4">
      <header className="grid grid-cols-[auto_auto_1fr_auto] grid-rows-[repeat(2,_auto)] items-center gap-x-3 gap-y-1 mt-2 mb-3">
        <img
          src={caretIcon}
          alt="back"
          onClick={() => navigateTo(-1)}
          className="rotate-90 row-start-1 row-span-2 col-start-1 col-span-1 cursor-pointer"
        />
        <div className="row-start-1 row-span-2 col-start-2 col-span-1 w-12 h-12 bg-[#1777BC] rounded-[50%]" />
        <p>
          {wallet?.slice(0, 5)}
          ***
          {wallet?.slice(37)}
        </p>
        <p className="row-start-2 row-span-1 col-start-3 col-span-1 text-[0.75rem]">
          {formatTimestamp(timestamp)}
        </p>
        <p
          className="row-start-1 row-span-2 col-start-4 col-span-1 text-sm flex items-center gap-2 cursor-pointer"
          onClick={() => navigateTo('send-message')}
        >
          <img src={replyImg} alt="reply" />
          Reply
        </p>
      </header>
      {isMain && (
        <>
          <div className="bg-[#4A4C54] h-[1px] my-4" />
          <div className="flex items-center gap-3">
            <p className="capitalize text-[#8F8F8F] font-normal">subject:</p>
            <p>{subject}</p>
          </div>
        </>
      )}
      <div className="bg-[#4A4C54] h-[1px] my-4" />
      <div className="max-h-[312px] overflow-y-auto overflow__bar">
        <pre className="whitespace-pre-wrap word__break break-words font-inter font-normal leading-6 block max-w-[352px]">
          {message}
        </pre>
        {attachments?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="flex flex-wrap"
          >
            {attachments.map((file: FileData, index: number) => (
              <SentDocumentCard
                key={file.url + index}
                name={file.name}
                index={index}
                type={file.type}
                fileUrl={file.url}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default MessageCard
