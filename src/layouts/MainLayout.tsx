import { useContext } from 'react'
import App from '../App'
import seichatLogo from '../assets/seichat.svg'
import RouteContext from '../ContextProvider'

const MainLayout = function () {
  const { isWidgetVisible, setIsWidgetVisible } = useContext(RouteContext)
  return (
    <>
      {isWidgetVisible ? (
        <App />
      ) : (
        <div
          className="w-max p-3 bg-[#141717] rounded-[50%] cursor-pointer"
          onClick={() => setIsWidgetVisible(prev => !prev)}
        >
          <img src={seichatLogo} alt="seichat logo" className="w-8 block" />
        </div>
      )}
    </>
  )
}

export default MainLayout
