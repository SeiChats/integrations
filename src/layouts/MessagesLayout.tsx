import { useContext } from 'react'

import logo from '../assets/placeholder-logo.jpg'
import RouteContext from '../providers/ContextProvider'
import Messages from '../pages/Messages'
import Support from '../pages/Support'
import Footer from '../components/Footer'
import SentMessages from '../pages/SentMessages'
import newMessageImg from '../assets/new-message.svg'
import Drafts from '@/pages/Drafts'

const MessagesLayout = function () {
  const { route, navigateTo } = useContext(RouteContext)

  return (
    <div className="h-full grid grid-rows-[max-content_max-content_1fr_max-content] relative">
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
      {route === 'inbox' ? (
        <Messages />
      ) : route === 'sent-messages' ? (
        <SentMessages />
      ) : route === 'drafts' ? (
        <Drafts />
      ) : (
        <Support />
      )}
      <div
        onClick={() => navigateTo('send-message')}
        className="bg-[#CF3A46] cursor-pointer p-2 w-max rounded-[50%] z-10 absolute
        inset-[auto_0_6em_auto]"
      >
        <img src={newMessageImg} alt="new message" />
      </div>
      <Footer />
    </div>
  )
}

export default MessagesLayout
