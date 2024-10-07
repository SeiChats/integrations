import { createContext, ReactNode, useEffect, useState } from 'react'

import { insertUser } from '../api'

interface SeichatConfig {
  projectName: string
  address: string
  logo: string
  isRegistered: boolean
}

const RouteContext = createContext<{
  route: string
  prevRoute: string | null
  navigateTo: (route: string | -1) => void
  isWidgetVisible: boolean
  address: string | null
  setAddress: React.Dispatch<React.SetStateAction<string | null>>
  setIsWidgetVisible: React.Dispatch<React.SetStateAction<boolean>>
  seichatConfig: SeichatConfig | null
  setSeichatConfig: React.Dispatch<React.SetStateAction<SeichatConfig | null>>
  data: any
  setData: React.Dispatch<any>
}>({
  route: '/',
  prevRoute: null,
  navigateTo: () => {},
  isWidgetVisible: false,
  address: null,
  setAddress: () => {},
  setIsWidgetVisible: () => {},
  seichatConfig: null,
  setSeichatConfig: () => {},
  data: null,
  setData: () => {},
})

export function Provider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState('/')
  const [prevRoute, setPrevRoute] = useState<string | null>(null)
  const [isWidgetVisible, setIsWidgetVisible] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [seichatConfig, setSeichatConfig] = useState<SeichatConfig | null>(null)
  const [data, setData] = useState<any>()

  useEffect(() => {
    if (!address) return
    ;(async function () {
      const data = await insertUser({
        wallet_address: address,
      })

      console.log(data)
      setRoute('inbox')
      // if (
      //   data.status === 500 ||
      //   data?.error?.code === '23505' ||
      //   data?.error?.details.endsWith('already exists.')
      // ) {
      //   const isUser = await lookupUser(address)

      //   if (isUser.status === 200 || isUser.data?.length === 0) {
      //     setRoute('login')
      //   } else {
      //     setRoute('set-pin')
      //   }
      // } else {
      //   setIsWidgetVisible(false)
      //   console.log(`Something went wrong. Please try again later.`)
      // }
    })()
  }, [address])

  return (
    <RouteContext.Provider
      value={{
        route,
        prevRoute,
        navigateTo(newRoute) {
          setPrevRoute(route)
          if (newRoute === -1) {
            setRoute(prevRoute!)
            return
          }
          setRoute(newRoute)
        },
        address,
        setAddress,
        isWidgetVisible,
        setIsWidgetVisible,
        seichatConfig,
        setSeichatConfig,
        data,
        setData,
      }}
    >
      {children}
    </RouteContext.Provider>
  )
}

export default RouteContext
