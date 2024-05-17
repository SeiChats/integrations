import { createContext, ReactNode, useEffect, useState } from 'react'

const RouteContext = createContext<{
  route: string
  navigateTo: (route: string) => void
  isWidgetVisible: boolean
  address: string | null
  setAddress: React.Dispatch<React.SetStateAction<string | null>>
  setIsWidgetVisible: React.Dispatch<React.SetStateAction<boolean>>
}>({
  route: '/',
  navigateTo: () => {},
  isWidgetVisible: false,
  address: null,
  setAddress: () => {},
  setIsWidgetVisible: () => {},
})

export function Provider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState('/')
  const [isWidgetVisible, setIsWidgetVisible] = useState(false)
  const [address, setAddress] = useState<string | null>(null)

  useEffect(() => {
    console.log(address)
  }, [address])

  return (
    <RouteContext.Provider
      value={{
        route,
        navigateTo(route) {
          setRoute(route)
        },
        address,
        setAddress,
        isWidgetVisible,
        setIsWidgetVisible,
      }}
    >
      {children}
    </RouteContext.Provider>
  )
}

export default RouteContext
