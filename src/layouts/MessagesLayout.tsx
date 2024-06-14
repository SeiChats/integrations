import { useContext } from 'react'

import RouteContext from '../providers/ContextProvider'
import Messages from '../pages/Messages'
import Footer from '../components/Footer'
import SentMessages from '../pages/SentMessages'
import newMessageImg from '../assets/new-message.svg'
import Drafts from '@/pages/Drafts'

const MessagesLayout = function () {
  const { route, navigateTo, seichatConfig } = useContext(RouteContext)

  return (
    <div className="h-full grid grid-rows-[max-content_max-content_1fr_max-content] relative">
      <header className="h-max mb-6">
        <ul className="flex items-center justify-between gap-4 capitalize">
          <li
            className="cursor-pointer relative"
            onClick={() => navigateTo('sent-messages')}
          >
            messages
            <span className="absolute inset-[auto_-2px_-8px_-2px] h-[4px] rounded-[30px_30px_0_0] bg-white" />
          </li>
          {seichatConfig?.isRegistered && (
            <li
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigateTo('support')}
            >
              {seichatConfig!.projectName} support{' '}
              <img
                src={seichatConfig!.logo}
                alt={`${seichatConfig!.projectName} logo`}
                className=" rounded-md"
              />
            </li>
          )}
        </ul>
      </header>
      {route === 'inbox' ? (
        <Messages />
      ) : route === 'sent-messages' ? (
        <SentMessages />
      ) : (
        <Drafts />
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
