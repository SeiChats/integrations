// import { Suspense } from 'react'
// import Loading from './pages/Loading'

import { useContext } from 'react'
import { motion } from 'framer-motion'

import MessagesLayout from './layouts/MessagesLayout'
import RouteContext from './ContextProvider'
import PinRecovery from './layouts/PinRecovery'
import Home from './pages/HomePage'

function App() {
  const { route } = useContext(RouteContext)

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'tween', duration: 0.2 }}
      className="text-white h-[600px] rounded-3xl p-6 font-inter w-[min(90%,_375px)] bg-[#141717] origin-bottom ml-auto"
    >
      {/*TODO abstract routing by creating a route component*/}
      {(route === 'messages' || route === 'support') && <MessagesLayout />}
      {(route === 'enter-pin' || route === 'recover-pin') && <PinRecovery />}
      {route === '/' && <Home />}
      {/* <Suspense fallback={<Loading />}></Suspense> */}
    </motion.div>
  )
}

export default App
