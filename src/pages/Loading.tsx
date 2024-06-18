import { useEffect, useContext } from 'react'

import seichatLogo from '../assets/seichat.svg'
import RouteContext from '../providers/ContextProvider'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const Loading = function () {
  const {
    setIsWidgetVisible,
    setAddress,
    setSeichatConfig,
    data: routeData,
  } = useContext(RouteContext)
  const { data, isSuccess } = useQuery({
    queryKey: ['seichats-config'],
    queryFn: async function () {
      const seichatsJSON = await fetch('../../seichats.config.json')

      const projectInfo = await seichatsJSON.json()

      console.log(projectInfo.address)

      const res = await axios.post(
        'https://chatbackend-336t.onrender.com/data/get',
        { walletAddress: projectInfo.address }
      )

      const data = res.data
      console.log(data)

      if (!data.result) {
        console.log('missing config file')
      }

      // if (!data.name?.trim().length && !data.address?.trim().length && !data.logo?.trim().length) {
      //   throw new Error("Missing field in config file. Please provide all")
      // }
      return data
    },
    retry: 1,
  })

  useEffect(() => {
    // console.log(data, isSuccess)
    if (!isSuccess) return
    // if (!data) {
    //   //TODO navigate to error page
    // }
    console.log(data)
    setSeichatConfig({
      projectName: data.result?.projectName,
      logo: data.result?.logo,
      address: data.result?.walletAddress,
      isRegistered: !!data.result,
    })
  }, [isSuccess])
  useEffect(() => {
    // Connect to the selected provider using eth_requestAccounts.
    const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
      try {
        if (routeData === 'keplr') {
          const chainId = '0x531'

          // Enabling before using the Keplr is recommended.
          // This method will ask the user whether to allow access if they haven't visited this website.
          // Also, it will request that the user unlock the wallet if the wallet is locked.
          await window.keplr.enable(chainId)

          const offlineSigner = window.keplr.getOfflineSigner(chainId)

          // You can get the address/public keys by `getAccounts` method.
          // It can return the array of address/public key.
          // But, currently, Keplr extension manages only one address/public key pair.
          // XXX: This line is needed to set the sender address for SigningCosmosClient.
          const accounts = await offlineSigner.getAccounts()

          console.log(accounts)

          return
        }

        const accounts = (await providerWithInfo.provider.request({
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
        })) as string[]

        await providerWithInfo.provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x531' }],
        })

        providerWithInfo.provider.on(
          'accountsChanged',
          function (accounts: string[]) {
            console.log(accounts)
            setAddress(accounts?.[0])
          }
        )

        console.log(accounts)
        setAddress(accounts?.[0])
      } catch (error) {
        const err = error as { code: number; message: string }

        console.log(err.code, err.message)
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error.
          // If this happens, the user rejected the connection request.
          setIsWidgetVisible(false)
          console.log('Please connect to MetaMask.')
        } else if (err.code === 4902) {
          await providerWithInfo.provider.request({
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
          handleConnect(providerWithInfo)
        } else if (err.code === -32603) {
          handleConnect(providerWithInfo)
        }
      }
    }
    handleConnect(routeData)
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
