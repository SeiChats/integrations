import MessagingWidget from '@/components/MessagingWidget'
import Image from 'next/image'

const SupportPage = function () {
  return (
    <div className="row-span-2 grid grid-rows-[1fr_auto]">
      <div className="grid place-content-center">
        <Image src="/nft-bg.png" alt="no messages" width={151} height={135} />
        <p className="capitalize font-semibold text-lg mt-4">sei something!</p>
      </div>
      <div className="relative">
        <textarea
          placeholder="Send Message"
          className="outline-none border border-white/20 shadow-custom bg-transparent resize-none w-full min-h-32 p-4 rounded-2xl"
        />
        <MessagingWidget className="absolute inset-[auto_1em_1em_auto]" />
      </div>
    </div>
  )
}

export default SupportPage
