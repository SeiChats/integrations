import { ethers } from 'ethers'
import contractAbi from './contract_abi.json'

declare global {
  interface Window {
    ethereum: any
    compass: any
    keplr: any
  }
}

export const getContract = async (): Promise<ethers.Contract> => {
  // if (typeof window === "undefined") {
  // 	//@ts-ignore
  // 	return;
  // }
  if (window.ethereum?.isConnected()) {
    const CONTRACT_ADDRESS: string | undefined =
      '0x9A94488130C370448F952E97ECa5D32F279285aA'

    const provider = new ethers.BrowserProvider(window.ethereum!)
    //   const provider = new ethers.JsonRpcProvider(
    //     "https://evm-rpc.arctic-1.seinetwork.io/"
    //   );

    const signer = await provider.getSigner()

    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer)

    return contract
  } else {
    await window.ethereum!.request({
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

    const CONTRACT_ADDRESS: string | undefined =
      '0x457bbF05A2E56BA519cc872ef371f5DE7Eb43A8A'
    //OLD => "0x4A756B9762dD63f1FBb562eC55a2637fbd774C02";

    const provider = new ethers.BrowserProvider(window.ethereum!)
    //   const provider = new ethers.JsonRpcProvider(
    //     "https://evm-rpc.arctic-1.seinetwork.io/"
    //   );

    const signer = await provider.getSigner()

    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer)

    return contract
  }
}
