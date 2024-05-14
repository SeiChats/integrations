import { createContext, ReactNode, useState } from 'react'

const RouteContext = createContext<{
  route: string
  navigateTo: (route: string) => void
  isWidgetVisible: boolean
  setIsWidgetVisible: React.Dispatch<React.SetStateAction<boolean>>
}>({
  route: '/',
  navigateTo: () => {},
  isWidgetVisible: false,
  setIsWidgetVisible: () => {},
})

export function Provider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState('/')
  const [isWidgetVisible, setIsWidgetVisible] = useState(false)

  return (
    <RouteContext.Provider
      value={{
        route,
        navigateTo(route) {
          setRoute(route)
        },
        isWidgetVisible,
        setIsWidgetVisible,
      }}
    >
      {children}
    </RouteContext.Provider>
  )
}

export default RouteContext
