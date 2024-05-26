import { useContext } from 'react'

import logo from '../assets/placeholder-logo.jpg'
import RouteContext from '@/providers/ContextProvider'
import Footer from '@/components/Footer'
import Support from '@/pages/Support'

const SupportLayout = function () {
  const { navigateTo } = useContext(RouteContext)
  return (
    <div className="h-full grid grid-rows-[max-content_1fr_max-content] relative">
      <header className="h-max mb-6 border-b border-white/5 pb-2">
        <ul className="flex items-center justify-between gap-4 capitalize">
          <li
            className="cursor-pointer"
            onClick={() => navigateTo('sent-messages')}
          >
            messages
          </li>
          <li
            className="flex items-center gap-2 cursor-pointer relative"
            onClick={() => navigateTo('support')}
          >
            pallet support{' '}
            <img src={logo} alt={`pallet logo`} className=" rounded-md" />
            <span className="absolute inset-[auto_-2px_-8px_-2px] h-[4px] rounded-[30px_30px_0_0] bg-white" />
          </li>
          {/*TODO make name and logo dynamic*/}
        </ul>
      </header>
      <div className="grid grid-rows-[1fr_auto]">
        <Support />
      </div>
      <Footer />
    </div>
  )
}

export default SupportLayout
