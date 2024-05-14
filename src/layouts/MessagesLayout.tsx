import { useContext } from 'react'

import logo from '../assets/placeholder-logo.jpg'
import inbox from '../assets/inbox.svg'
import sent from '../assets/sent.svg'
import draft from '../assets/draft.svg'
import logoWhite from '../assets/logo-white.svg'
import RouteContext from '../ContextProvider'
import Messages from '../pages/Messages'
import Support from '../pages/Support'

const MessagesLayout = function () {
  const { route } = useContext(RouteContext)

  return (
    <div className="h-full grid grid-rows-[max-content_max-content_1fr_max-content]">
      <header className="h-max mb-4">
        <ul className="flex items-center justify-between gap-4 capitalize">
          <li className="cursor-pointer">messages</li>
          <li className="flex items-center gap-2 cursor-pointer">
            pallet support{' '}
            <img src={logo} alt={`pallet logo`} className=" rounded-md" />
          </li>
          {/*TODO make name and logo dynamic*/}
        </ul>
      </header>

      {route === 'messages' ? <Messages /> : <Support />}
      <footer className="flex flex-wrap items-center justify-between capitalize mt-auto text-sm">
        <div className="w-full h-[1px] bg-white/5 my-4" />
        {/* TODO change links to buttons */}
        <a href="/">
          <img src={inbox} alt="inbox" className="mx-auto mb-1" />
          <span className="opacity-80">inbox</span>
        </a>
        <a href="/">
          <img src={sent} alt="sent" className="mx-auto mb-1 mt-1" />
          <span className="opacity-80">sent</span>
        </a>
        <a href="/">
          <img src={draft} alt="draft" className="mx-auto mb-1 mt-1" />
          <span className="opacity-80">draft</span>
        </a>
        <a href="/">
          <img src={logoWhite} alt="home" className="mx-auto" />
        </a>
      </footer>
    </div>
  )
}

export default MessagesLayout
