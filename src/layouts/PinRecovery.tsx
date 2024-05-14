import { useContext } from 'react'

import cancelIcon from '../assets/cancel.svg'
import RouteContext from '../ContextProvider'
import EnterPin from '../pages/EnterPin'
import RecoverPin from '../pages/RecoverPin'

const PinRecovery = function () {
  const { route } = useContext(RouteContext)

  return (
    <div className="grid h-full">
      <div>
        <img src={cancelIcon} alt="close" className="w-4 block ml-auto" />
        <h1 className="font-semibold text-3xl mt-3 mb-2 capitalize">
          pin recovery
        </h1>
        <p className="text-sm opacity-80">
          Lets setup your pin recovery support, wink wink
        </p>
        <form action="" className="mt-8">
          {route === 'enter-pin' ? <EnterPin /> : <RecoverPin />}
        </form>
      </div>
      {/* TODO check back on width and height */}
      <img
        className="mt-auto mx-auto my-4"
        src="/logo.png"
        alt="seichat logo"
        width={120}
        height={30}
      />
    </div>
  )
}

export default PinRecovery
