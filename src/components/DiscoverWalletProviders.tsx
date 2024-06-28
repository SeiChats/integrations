import { useContext } from 'react'

import { useSyncProviders } from '../hooks/useSyncProviders'
import keplr from '../assets/keplr.svg'
import metamask from '../assets/metamask.svg'
import rabby from '../assets/rabby.svg'
import { twMerge } from 'tailwind-merge'
import RouteContext from '@/providers/ContextProvider'
import { ethers } from 'ethers'

export const DiscoverWalletProviders = () => {
  const { navigateTo, setData } = useContext(RouteContext)
  const providers = useSyncProviders().filter(({ info: { name } }) => {
    return (
      name.toLowerCase() === 'metamask' || name.toLowerCase() === 'rabby wallet'
    )
  })

  const walletsInfo = {
    metamask: {
      isInstalled: providers.some(
        ({ info: { name } }) => name.toLowerCase() === 'metamask'
      ),
      provider: providers.find(
        ({ info: { name } }) => name.toLowerCase() === 'metamask'
      ),
    },
    compass: {
      isInstalled: providers.some(
        ({ info: { name } }) => name.toLowerCase() === 'rabby wallet'
      ),
      provider: providers.find(
        ({ info: { name } }) => name.toLowerCase() === 'rabby wallet'
      ),
    },
    keplr: !!window.keplr,
  }

  return (
    <div className="max-content grid gap-4">
      <div
        className={twMerge(
          'flex items-center gap-4 bg-[#191d1d] p-4 rounded-[8px] cursor-pointer hover:bg-[rgb(55_65_81)]',
          !walletsInfo.metamask.isInstalled &&
            'opacity-60 cursor-not-allowed hover:bg-[#191d1d]'
        )}
        onClick={() => {
          if (!walletsInfo.metamask.isInstalled) return
          localStorage.setItem(
            'seichatProvider',
            walletsInfo.metamask.provider!.info.name
          )
          setData(walletsInfo.metamask.provider!)
          navigateTo('loading')
        }}
      >
        <img className="w-7" src={metamask} alt="metamask" />
        <p className="text-white font-semibold text-lg">Metamask</p>
      </div>
      {/* TODO enable keplr wallet */}
      <div
        className={twMerge(
          'flex items-center gap-4 bg-[#191d1d] p-4 rounded-[8px] cursor-pointer hover:bg-[rgb(55_65_81)]',
          // !walletsInfo.keplr &&
          true && 'opacity-60 cursor-not-allowed hover:bg-[#191d1d]'
        )}
        onClick={() => {
          // if (!walletsInfo.keplr) return
          return
          setData(new ethers.BrowserProvider(window.keplr))
          navigateTo('loading')
        }}
      >
        <img className="w-7" src={keplr} alt="keplr" />
        <p className="text-white font-semibold text-lg">Keplr</p>
      </div>
      <div
        className={twMerge(
          'flex items-center gap-4 bg-[#191d1d] p-4 rounded-[8px] cursor-pointer hover:bg-[rgb(55_65_81)]',
          !walletsInfo.compass.isInstalled &&
            'opacity-60 cursor-not-allowed hover:bg-[#191d1d]'
        )}
        onClick={() => {
          if (!walletsInfo.compass.isInstalled) return
          localStorage.setItem(
            'seichatProvider',
            walletsInfo.compass.provider!.info.name
          )
          setData(walletsInfo.compass.provider!)
          navigateTo('loading')
        }}
      >
        <img className="w-7" src={rabby} alt="rabby" />
        <p className="text-white font-semibold text-lg">Rabby</p>
      </div>
    </div>
  )
}
