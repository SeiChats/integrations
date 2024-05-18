import { useContext, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import logo from '../assets/logo.png'
import CloseWidget from '../components/CloseWidget'
import FormButton from '../components/FormButton'
import PasswordInput from '../components/PasswordInput'
import { login } from '../api'
import RouteContext from '../providers/ContextProvider'
import incorrect from '../assets/incorrect.svg'

const Login = function () {
  const [password, setPassword] = useState<string>()
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const { address, navigateTo } = useContext(RouteContext)
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess(data) {
      if (data.isPasswordCorrect) {
        if (data.hasSecurityQuestion) {
          navigateTo('messages')
        } else {
          navigateTo('recover-pin')
        }
      }
      setIsPasswordValid(data.isPasswordCorrect)
    },
    onError(error) {
      console.log(error)
    },
  })

  return (
    <div className="grid h-full">
      <div>
        <CloseWidget />
        <h1 className="font-semibold text-3xl mt-3 mb-2">Log in</h1>
        <p className="text-sm opacity-80">Enter pin to access your account</p>
        <form
          action=""
          onSubmit={e => {
            e.preventDefault()
          }}
          className="mt-8"
        >
          <PasswordInput
            onChange={e => setPassword((e.target as HTMLInputElement).value)}
            label="login"
            htmlFor="pin"
          >
            {!isPasswordValid && (
              <p className="flex items-center gap-2 ml-auto text-sm text-white/80">
                <img src={incorrect} alt="incorrect password" className="w-4" />
                incorrect pin
              </p>
            )}
          </PasswordInput>
          <FormButton
            onClick={() => {
              mutate({ address: address!, password: password! })
            }}
            isLoading={isPending}
            disabled={isPending || !password?.trim().length}
          >
            Let me in!
          </FormButton>
        </form>
      </div>
      <img className="mt-auto mx-auto my-4" src={logo} alt="seichat logo" />
    </div>
  )
}

export default Login
