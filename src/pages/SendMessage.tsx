import { useContext, useState } from 'react'

import minimizeIcon from '../assets/minus.svg'
import closeIcon from '../assets/cancel.svg'
import trashIcon from '../assets/trash.svg'
import MessagingWidget from '../components/MessagingWidget'
import SearchBar from '../components/SearchBar'
import Footer from '../components/Footer'
import RouteContext from '../providers/ContextProvider'

const SendMessage = function () {
  const { address } = useContext(RouteContext)
  const [sendTo, setSendTo] = useState('')
  return (
    <div className="grid grid-rows-[1fr_auto] h-full">
      <div className="p-6 grid grid-rows-[auto_1fr] h-full">
        <SearchBar />
        <div className="bg-[#141717] p-4 rounded-[13.62px_13.62px_0px_0px] grid grid-rows-[auto_auto_auto_auto_1fr_auto] h-full">
          <div className="flex items-center gap-4 justify-end">
            <img src={minimizeIcon} alt="minimize" className="cursor-pointer" />
            <img src={closeIcon} alt="close" className="cursor-pointer" />
          </div>
          <div>
            <p className="capitalize text-sm flex items-center gap-4">
              from:
              <span>
                {address?.slice(0, 5)}....{address?.slice(37)}
              </span>
            </p>
          </div>
          <div className="relative pt-4 mt-4">
            <Divider />
            <p className="capitalize text-sm flex items-center gap-4">
              to:
              <input
                onBlur={e => {
                  setSendTo(e.target.value)
                  const address = e.target.value
                  e.target.value = `${address?.slice(0, 5)}....${address?.slice(
                    37
                  )}`
                }}
                onFocus={e => {
                  e.target.value = sendTo
                }}
                type="text"
                className="border-none outline-none bg-transparent w-full"
              />
            </p>
          </div>
          <div className="relative pt-4 mt-4">
            <Divider />
            <p className="capitalize text-sm flex items-center gap-4">
              subject:
              <input
                type="text"
                className="border-none outline-none bg-transparent w-full"
              />
            </p>
          </div>
          <div className="relative mt-4 pt-4">
            <Divider />
            <textarea className="resize-none w-full bg-transparent h-full" />
          </div>
          <div className="flex items-center justify-between relative pt-4 mt-4">
            <Divider />
            <button className="flex items-center gap-2 text-sm text-[#D6D6D6]">
              <span className="p-2 bg-[#FFA7A733] rounded-lg">
                <img src={trashIcon} alt="save to draft" className="w-4" />
              </span>
              Save as Draft
            </button>
            <MessagingWidget />
          </div>
        </div>
      </div>
      <Footer className="bg-[#141717] p-6 pt-0" />
    </div>
  )
}

const Divider = function () {
  return (
    <div className="absolute inset-[0_-16px_auto_-16px] bg-[#FFFFFF0F] h-[1px]" />
  )
}

export default SendMessage
