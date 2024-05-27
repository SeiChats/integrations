import { convertTimestampToTime } from '@/utils/utils'

interface SentSupportMessageProps {
  message: string
  timeStamp: number
}

const SentSupportMessage = function ({
  message,
  timeStamp,
}: SentSupportMessageProps) {
  return (
    <div className="bg-[#191D1D] p-4 rounded-[18px_18px_0px_18px] w-[90%] ml-auto mb-3">
      <div className="flex items-center justify-between text-white/80 mb-3">
        <p className=" text-[0.9rem]">Pallet.Exchange.Sei</p>
        {/*TODO make this name dynamic or remove it*/}
        <p className="text-[0.75rem]">{convertTimestampToTime(timeStamp)}</p>
      </div>
      <p>{message}</p>
    </div>
  )
}

export default SentSupportMessage
