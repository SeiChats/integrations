import { useContext } from 'react'
import cancelIcon from '../assets/cancel.svg'
import RouteContext from '../ContextProvider'

const CloseWidget = function () {
  const { setIsWidgetVisible } = useContext(RouteContext)
  return (
    <img
      src={cancelIcon}
      alt="close"
      className="w-4 block ml-auto cursor-pointer"
      onClick={() => setIsWidgetVisible(false)}
    />
  )
}

export default CloseWidget
