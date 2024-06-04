import RouteContext from '@/providers/ContextProvider'
import { useContext } from 'react'
import SentDocumentCard from './SentDocument'

interface SentSupportMessageProps {
  message: string
  time: string
  attachment: any
  sender: string
}

const SentSupportMessage = function ({
  message,
  time,
  attachment,
  sender,
}: SentSupportMessageProps) {
  const { seichatConfig } = useContext(RouteContext)
  const isAdmin = seichatConfig!.address.toLowerCase() === sender!.toLowerCase()

  const name =
    seichatConfig!.name[0].toUpperCase() +
    seichatConfig!.name.toLowerCase().slice(1)

  return (
    <div className="bg-[#191D1D] p-4 rounded-[18px_18px_0px_18px] w-[90%] ml-auto mb-3">
      <div className="flex items-center justify-between text-white/80 mb-3">
        <p className=" text-[0.9rem]">
          {isAdmin
            ? `${name}.Exchange.Sei`
            : `${sender?.slice(0, 5)}***${sender?.slice(37)}`}
        </p>
        {/*TODO make this name dynamic or remove it*/}
        <p className="text-[0.75rem]">{time.replace(' ', '')}</p>
      </div>
      {message === 'uploading file...' ? (
        attachment[0].type === 'image' ? (
          <img
            src={attachment[0].url}
            alt={attachment[0].name}
            className="aspect-[297/201] object-cover object-center rounded-[15px]"
          />
        ) : (
          <SentDocumentCard
            name={attachment[0].name}
            fileUrl={attachment[0].url}
            index={0}
          />
        )
      ) : (
        <p>{message}</p>
      )}
    </div>
  )
}

export default SentSupportMessage
