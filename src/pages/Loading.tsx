import { useEffect, useContext } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'

import seichatLogo from '../assets/seichat.svg'
import RouteContext from '../providers/ContextProvider'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'

const Loading = function () {
  const { setIsWidgetVisible, setAddress, setSeichatConfig } =
    useContext(RouteContext)
  const { data } = useQuery({
    queryKey: ['seichats-config'],
    queryFn: async function () {
      const res = await fetch('../../seichats.config.json')
      const data = await res.json()
      return data
    },
    staleTime: Infinity,
  })
  setSeichatConfig(data)
  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      console.log(provider)
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
              chainId: '0xae3f3',
              chainName: 'Sei Devnet',
              rpcUrls: [
                'https://evm-rpc.arctic-1.seinetwork.io',
                'https://evm-rpc.arctic-1.seinetwork.io',
              ],
            },
          ],
        })
        await window.ethereum?.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xae3f3' }],
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
                chainId: '0xae3f3',
                chainName: 'Sei Devnet',
                nativeCurrency: {
                  name: 'Sei',
                  symbol: 'SEI',
                  decimals: 18,
                },
                rpcUrls: [
                  'https://evm-rpc-arctic-1.sei-apis.com',
                  'https://evm-rpc-arctic-1.sei-apis.com',
                ],
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
      <img src={seichatLogo} alt="seichat logo" className="w-16 block" />
    </motion.div>
  )
}

export default Loading
