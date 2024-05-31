import { useContext } from 'react'

import RouteContext from '@/providers/ContextProvider'
import Footer from '@/components/Footer'
import Support from '@/pages/Support'
import SupportAdmin from '@/pages/SupportAdmin'

const SupportLayout = function () {
  const { navigateTo, address, route, seichatConfig } = useContext(RouteContext)

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
            {seichatConfig!.name} support{' '}
            <img
              src={seichatConfig!.logo}
              alt={`${seichatConfig!.name} logo`}
              className="rounded-md"
            />
            <span className="absolute inset-[auto_-2px_-8px_-2px] h-[4px] rounded-[30px_30px_0_0] bg-white" />
          </li>
          {/*TODO make name and logo dynamic*/}
        </ul>
      </header>
      <div className="grid grid-rows-[1fr_auto]">
        {route === 'support' &&
          address!.toLowerCase() === seichatConfig!.address.toLowerCase() && (
            <SupportAdmin />
          )}
        {route === 'support' &&
          address!.toLowerCase() !== seichatConfig!.address.toLowerCase() && (
            <Support />
          )}
        {route.startsWith('support/') &&
          address!.toLowerCase() === seichatConfig!.address.toLowerCase() && (
            <Support />
          )}
      </div>
      <Footer />
    </div>
  )
}

export default SupportLayout
