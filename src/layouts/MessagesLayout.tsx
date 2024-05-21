import { useContext } from 'react'

import logo from '../assets/placeholder-logo.jpg'
import RouteContext from '../providers/ContextProvider'
import Messages from '../pages/Messages'
import Support from '../pages/Support'
import Footer from '../components/Footer'
import SentMessages from '../pages/SentMessages'

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
      {route === 'inbox' ? (
        <Messages />
      ) : route === 'sent-messages' ? (
        <SentMessages />
      ) : (
        <Support />
      )}
      <Footer />
    </div>
  )
}

export default MessagesLayout
