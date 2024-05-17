import { createContext, ReactNode, useEffect, useState } from 'react'
import { insertUser, lookupUser } from './api'

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
    if (!address) return
    ;(async function () {
      const data = await insertUser({
        wallet_address: address,
      })
      console.log(data)

      if (
        data.status === 500 ||
        data?.error?.code === '23505' ||
        data?.error?.details.endsWith('already exists.')
      ) {
        const isUser = await lookupUser(address)
        console.log(isUser)
        if (isUser.status === 200 || isUser.data?.length === 0) {
          setRoute(
            'enter-pin'
            // callbackUrl ? `/login?callbackUrl=${callbackUrl}` : "/login"
          )
        } else {
          setRoute('set-pin')
        }
      } else {
        setIsWidgetVisible(false)
        console.log(`Something went wrong. Please try again later.`)
      }
    })()
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
