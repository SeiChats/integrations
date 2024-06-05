import { ethers } from 'ethers'
import contractAbi from './contract_abi.json'

declare global {
  interface Window {
    ethereum: any
    compass: any
    keplr: any
    compassEvm: any
  }
}

const getProvider = async (): Promise<ethers.BrowserProvider> => {
  try {
    if (!window.ethereum) {
      throw new Error('MetaMask wallet is not available.')
    }
    return new ethers.BrowserProvider(window.ethereum)
  } catch (error) {
    console.error('Error in getting provider:', error)
    throw error // rethrow the error after logging it
  }
}

// Function to get the contract
export const getContract = async (): Promise<ethers.Contract> => {
  const CONTRACT_ADDRESS: string = '0x7Da78c873F8f0E27050b97ce46802c6569a540Ca'

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
