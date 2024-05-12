import Image from 'next/image'
import Link from 'next/link'

import newMessageImg from '../../../icons/new-message.svg'
import SearchBar from '@/components/SearchBar'

const MessagesPage = function () {
  return (
    <>
      <SearchBar />
      <div className="h-full grid place-content-center relative">
        <div>
          <Image src="/nft-bg.png" alt="no messages" width={151} height={135} />
          <p className="capitalize font-semibold mt-4 mb-3">no new messages</p>
          <button className="bg-black capitalize outline-none border-none rounded-full px-5 py-3 cursor-pointer text-sm">
            send message
          </button>
        </div>
        <Link
          href="/"
          className="bg-[#CF3A46] cursor-pointer p-2 w-max rounded-[50%] z-10 absolute
        inset-[auto_0_1em_auto]"
        >
          <Image src={newMessageImg} alt="new message" />
        </Link>
      </div>
    </>
  )
}

export default MessagesPage
