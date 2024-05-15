import { useState, useEffect, useContext } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'

import logo from '../assets/logo.png'
import PasswordInput from '../components/PasswordInput'
import FormButton from '../components/FormButton'
import CloseWidget from '../components/CloseWidget'
import RouteContext from '../ContextProvider'

export default function Home() {
  const { setIsWidgetVisible } = useContext(RouteContext)
  const [wallet, setWallet] = useState<{ accounts: string[] }>({ accounts: [] })
  const [isConnecting, setIsConnecting] = useState(false)
  const hasWallet = !!wallet.accounts[0]?.length

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
        // await window.ethereum.request({
        //   method: 'wallet_revokePermissions',
        // })
        setIsConnecting(true)
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
        updateWallet(accounts)
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xae3f3' }],
        })
        console.log('switched chain')
      } catch (err) {
        console.log(err.code, err.message)
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error.
          // If this happens, the user rejected the connection request.
          setIsWidgetVisible(false)
          console.log('Please connect to MetaMask.')
        } else {
          // console.error(err)
        }
      } finally {
        setIsConnecting(false)
      }
    }
    getProvider()
  }, [])

  const updateWallet = async (accounts: any) => {
    setWallet({ accounts })
  }

  return (
    <div className="grid h-full">
      {/* {wallet.accounts[0]} */}
      <div>
        <CloseWidget />
        <h1 className="font-semibold text-3xl mt-3 mb-2 capitalize">
          create pin
        </h1>
        <p className="text-sm opacity-80">
          Create a{' '}
          <span className="text-[#57E44B] font-semibold">Six-digit</span> pin
          for extra security
        </p>
        <form action="" className="mt-8">
          <PasswordInput
            label="enter password"
            htmlFor="password"
            disabled={isConnecting || !hasWallet}
          />
          <PasswordInput
            label="re-enter password"
            htmlFor="password"
            disabled={isConnecting || !hasWallet}
          />
          <div className="flex items-start gap-2 text-sm">
            <p>*</p>
            <p>
              Make sure it&apos;s a memorable one or you could just write it
              down somewhere safe
            </p>
          </div>
          <FormButton
            className="mt-8 disabled:cursor-not-allowed"
            disabled={isConnecting || !hasWallet}
          >
            check
          </FormButton>
        </form>
      </div>
      {/* TODO check back on width */}
      <img className="mt-auto mx-auto my-4" src={logo} alt="seichat logo" />
    </div>
  )
}
