import { useEffect, useContext } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'

import seichatLogo from '../assets/seichat.svg'
import RouteContext from '../providers/ContextProvider'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'

const Loading = function () {
  const { setIsWidgetVisible, setAddress, setSeichatConfig } =
    useContext(RouteContext)
  const { data, isSuccess } = useQuery({
    queryKey: ['seichats-config'],
    queryFn: async function () {
      const res = await fetch('../../seichats.config.json')

      const data = await res.json()

      if (!data) {
        console.log('missing config file')
      }

      // if (!data.name?.trim().length && !data.address?.trim().length && !data.logo?.trim().length) {
      //   throw new Error("Missing field in config file. Please provide all")
      // }
      return data
    },
    staleTime: Infinity,
    retry: 1,
  })

  useEffect(() => {
    // console.log(data, isSuccess)
    // if (!isSuccess) return
    // if (!data) {
    //   //TODO navigate to error page
    // }
    setSeichatConfig(data)
  }, [isSuccess])
  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      // Transform provider to true or false.
      const hasProvider = Boolean(provider)

      if (!hasProvider) {
        setIsWidgetVisible(false)
        return
      }

      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
          params: [
            {
              chainId: '0x531',
              chainName: 'Sei Network',
              rpcUrls: [
                'https://evm-rpc.sei-apis.com',
                'wss://evm-ws.sei-apis.com',
              ],
            },
          ],
        })
        await window.ethereum?.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x531' }],
        })
        setAddress(accounts?.[0])

        window.ethereum.on('accountsChanged', function (accounts: string[]) {
          setAddress(accounts?.[0])
        })
      } catch (err: any) {
        console.log(err.code, err.message)
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error.
          // If this happens, the user rejected the connection request.
          setIsWidgetVisible(false)
          console.log('Please connect to MetaMask.')
        } else if (err.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x531',
                chainName: 'Sei Network',
                nativeCurrency: {
                  name: 'Sei',
                  symbol: 'SEI',
                  decimals: 18,
                },
                rpcUrls: [
                  'https://evm-rpc.sei-apis.com',
                  'wss://evm-ws.sei-apis.com',
                ],
                blockExplorerUrls: ['https://seitrace.com'],
              },
            ],
          })

          getProvider()
        }
      }
    }
    getProvider()
  }, [])

  return (
    <motion.div
      className="h-full grid place-items-center"
      exit={{ opacity: 0, x: '-100%' }}
    >
      <motion.img
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ repeat: Infinity, duration: 0.5, repeatType: 'reverse' }}
        src={seichatLogo}
        alt="seichat logo"
        className="w-16 block"
      />
    </motion.div>
  )
}

export default Loading
