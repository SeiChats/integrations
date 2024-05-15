import { useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import App from '../App'
import seichatLogo from '../assets/seichat.svg'
import RouteContext from '../ContextProvider'

const MainLayout = function () {
  const { isWidgetVisible, setIsWidgetVisible } = useContext(RouteContext)
  return (
    <AnimatePresence>
      {isWidgetVisible ? (
        <App />
      ) : (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="w-max p-3 bg-[#141717] rounded-[50%] cursor-pointer ml-auto"
          onClick={() => setIsWidgetVisible(prev => !prev)}
        >
          <img src={seichatLogo} alt="seichat logo" className="w-8 block" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MainLayout
