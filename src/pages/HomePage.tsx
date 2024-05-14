import { useState, useEffect } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'

import logo from '../assets/logo.png'
import PasswordInput from '../components/PasswordInput'
import FormButton from '../components/FormButton'
import CloseWidget from '../components/CloseWidget'

export default function Home() {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null)

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      console.log(provider)
      // Transform provider to true or false.
      setHasProvider(Boolean(provider))
    }

    getProvider()
  }, [])

  return (
    <div className="grid h-full">
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
          <PasswordInput label="enter password" htmlFor="password" />
          <PasswordInput label="re-enter password" htmlFor="password" />
          <div className="flex items-start gap-2 text-sm">
            <p>*</p>
            <p>
              Make sure it&apos;s a memorable one or you could just write it
              down somewhere safe
            </p>
          </div>
          <FormButton
            className="mt-8 disabled:cursor-not-allowed"
            disabled={!hasProvider}
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
