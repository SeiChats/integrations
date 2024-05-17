import { useEffect, useContext } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'

import seichatLogo from '../assets/seichat.svg'
import RouteContext from '../ContextProvider'
import { motion } from 'framer-motion'

const Loading = function () {
  const { setIsWidgetVisible, setAddress } = useContext(RouteContext)
  // const [isConnecting, setIsConnecting] = useState(false)

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
        // setIsConnecting(true)
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
        console.log('connected accounts')
        setAddress(accounts?.[0])
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xae3f3' }],
        })
        console.log('switched chain')
      } catch (err: any) {
        console.log(err.code, err.message)
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error.
          // If this happens, the user rejected the connection request.
          setIsWidgetVisible(false)
          console.log('Please connect to MetaMask.')
        } else {
          console.error(err)
        }
      } finally {
        // setIsConnecting(false)
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
