import { ethers } from 'ethers'
import contractAbi from './contract_abi.json'
import { store } from '@/hooks/store'

declare global {
  interface Window {
    ethereum: any
    compass: any
    keplr: any
    compassEvm: any
  }
}

export const getProvider = async (): Promise<ethers.BrowserProvider> => {
  try {
    const providerObj = store
      .value()
      ?.find(
        ({ info: { name } }) => name === localStorage.getItem('seichatProvider')
      )?.provider

    if (!providerObj) throw new Error('invalid provider')
    const provider = new ethers.BrowserProvider(providerObj!)

    return provider
  } catch (error) {
    console.error('Error in getting provider:', error)
    throw error // rethrow the error after logging it
  }
}

// Function to get the contract
export const getContract = async (): Promise<ethers.Contract> => {
  const CONTRACT_ADDRESS: string = '0x7Da78c873F8f0E27050b97ce46802c6569a540Ca'

  console.log(localStorage.getItem('seichatProvider'))

  try {
    const provider = await getProvider()
    console.log('Provider :', provider)
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer)
    return contract
  } catch (error) {
    console.error('Failed to get the contract:', error)
    throw error
  }
}
