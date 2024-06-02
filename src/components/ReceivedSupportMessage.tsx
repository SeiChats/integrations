import { convertTimestampToTime } from '@/utils/utils'

interface ReceivedSupportMessageProps {
  message: string
  timeStamp: number
}

const ReceivedSupportMessage = function ({
  message,
  timeStamp,
}: ReceivedSupportMessageProps) {
  return (
    <div className="bg-[#3B3E3E] p-3 rounded-[18px_18px_18px_0px] w-[90%] mr-auto mb-4">
      <div className="flex items-center justify-between text-white/80 mb-3">
        <p className=" text-[0.9rem]">Pallet.Exchange.Sei</p>
        <p className="text-[0.75rem]">{convertTimestampToTime(timeStamp)}</p>
      </div>
      <p>{message}</p>
    </div>
  )
}

export default ReceivedSupportMessage
