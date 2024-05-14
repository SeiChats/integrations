import cancelIcon from '../assets/cancel.svg'
import logo from '../assets/logo.png'
import PasswordInput from '../components/PasswordInput'
import FormButton from '../components/FormButton'

export default function Home() {
  return (
    <div className="grid h-full">
      <div>
        <img src={cancelIcon} alt="close" className="w-4 block ml-auto" />
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
          <FormButton className="mt-8">check</FormButton>
        </form>
      </div>
      {/* TODO check back on width */}
      <img className="mt-auto mx-auto my-4" src={logo} alt="seichat logo" />
    </div>
  )
}
