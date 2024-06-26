import { useContext } from 'react'

import logo from '../assets/logo.png'
import RouteContext from '../providers/ContextProvider'
import EnterPin from '../pages/EnterPin'
import RecoverPin from '../pages/RecoverPin'
import CloseWidget from '../components/CloseWidget'

const PinRecovery = function () {
  const { route } = useContext(RouteContext)

  return (
    <div className="grid h-full">
      <div>
        <CloseWidget />
        <h1 className="font-semibold text-3xl mt-3 mb-2 capitalize">
          password recovery
        </h1>
        <p className="text-sm opacity-80">
          Lets setup your password recovery support, wink wink
        </p>
        <form
          action=""
          onSubmit={e => {
            e.preventDefault()
          }}
          className="mt-8"
        >
          {route === 'enter-pin' ? <EnterPin /> : <RecoverPin />}
        </form>
      </div>
      <img className="mt-auto mx-auto my-4" src={logo} alt="seichat logo" />
    </div>
  )
}

export default PinRecovery
