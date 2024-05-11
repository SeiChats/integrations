import { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import logo from '../../icons/placeholder-logo.jpg'
import inbox from '../../icons/inbox.svg'
import sent from '../../icons/sent.svg'
import draft from '../../icons/draft.svg'
import logoWhite from '../../icons/logo-white.svg'

const MessagesLayout = function ({ children }: { children: ReactNode }) {
  return (
    <div className="h-full grid grid-rows-[max-content_max-content_1fr_max-content]">
      <header className="h-max mb-4">
        <ul className="flex items-center justify-between gap-4 capitalize">
          <li className="cursor-pointer">messages</li>
          <li className="flex items-center gap-2 cursor-pointer">
            pallet support{' '}
            <Image src={logo} alt={`pallet logo`} className=" rounded-md" />
          </li>
          {/*TODO make name and logo dynamic*/}
        </ul>
      </header>

      {children}
      <footer className="flex flex-wrap items-center justify-between capitalize mt-auto text-sm">
        <div className="w-full h-[1px] bg-white/5 my-4" />
        <Link href="/">
          <Image src={inbox} alt="inbox" className="mx-auto mb-1" />
          <span className="opacity-80">inbox</span>
        </Link>
        <Link href="/">
          <Image src={sent} alt="sent" className="mx-auto mb-1 mt-1" />
          <span className="opacity-80">sent</span>
        </Link>
        <Link href="/">
          <Image src={draft} alt="draft" className="mx-auto mb-1 mt-1" />
          <span className="opacity-80">draft</span>
        </Link>
        <Link href="/">
          <Image src={logoWhite} alt="home" className="mx-auto" />
        </Link>
      </footer>
    </div>
  )
}

export default MessagesLayout
