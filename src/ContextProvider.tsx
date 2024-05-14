import { createContext, ReactNode, useState } from 'react'

const RouteContext = createContext<{
  route: string
  navigateTo: (route: string) => void
}>({
  route: '/',
  navigateTo: () => {},
})

export function Provider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState('/')

  return (
    <RouteContext.Provider
      value={{
        route,
        navigateTo(route) {
          setRoute(route)
        },
      }}
    >
      {children}
    </RouteContext.Provider>
  )
}

export default RouteContext
