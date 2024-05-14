import { ReactNode } from 'react'
import Image from 'next/image'
import cancelIcon from '../../icons/cancel.svg'
import FormButton from '@/components/FormButton'

interface LayoutProps {
  children: ReactNode
}

const Layout = function ({ children }: LayoutProps) {
  return (
    <div className="grid h-full">
      <div>
        <Image src={cancelIcon} alt="close" className="w-4 block ml-auto" />
        <h1 className="font-semibold text-3xl mt-3 mb-2 capitalize">
          pin recovery
        </h1>
        <p className="text-sm opacity-80">
          Lets setup your pin recovery support, wink wink
        </p>
        <form action="" className="mt-8">
          {children}
        </form>
      </div>
      <Image
        className="mt-auto mx-auto my-4"
        src="/logo.png"
        alt="seichat logo"
        width={120}
        height={30}
      />
    </div>
  )
}

export default Layout
