// import { Suspense } from 'react'
// import Loading from './pages/Loading'

import { useContext, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

import MessagesLayout from './layouts/MessagesLayout'
import RouteContext from './providers/ContextProvider'
import PinRecovery from './layouts/PinRecovery'
import Home from './pages/HomePage'
import Loading from './pages/Loading'
import Login from './pages/Login'
import SendMessage from './pages/SendMessage'
import Message from './pages/Message'
import SupportLayout from './layouts/SupportLayout'

function App() {
  const { route, setIsWidgetVisible } = useContext(RouteContext)
  const widgetRef = useRef<HTMLDivElement>(null)

  const handleOuterClick = function (this: Document, ev: MouseEvent) {
    if (!widgetRef.current) {
      return
    }
    if (!widgetRef.current?.contains(ev.target as Node)) {
      setIsWidgetVisible(false)
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleOuterClick, true)

    return () => document.removeEventListener('click', handleOuterClick)
  }, [])

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'tween', duration: 0.2 }}
      ref={widgetRef}
      className={twMerge(
        'text-white h-[600px] rounded-3xl p-6 font-inter w-[min(90%,_400px)] bg-[#141717] origin-bottom ml-auto overflow-hidden',
        route === 'send-message' && 'p-0 bg-[#171b1b]'
      )}
    >
      <AnimatePresence>
        {/*TODO abstract routing by creating a route component*/}
        {(route === 'inbox' ||
          route === 'sent-messages' ||
          route === 'drafts') && <MessagesLayout />}
        {route.startsWith('support') && <SupportLayout />}
        {(route === 'enter-pin' || route === 'recover-pin') && <PinRecovery />}
        {route === 'set-pin' && <Home />}
        {route === '/' && <Loading />}
        {route === 'login' && <Login />}
        {route === 'send-message' && <SendMessage />}
        {route.startsWith('messages/') && <Message />}

        {/* <Suspense fallback={<Loading />}></Suspense> */}
      </AnimatePresence>
    </motion.div>
  )
}

export default App
