import { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { useMutation } from '@tanstack/react-query'

import logo from '../assets/logo.png'
import PasswordInput from '../components/PasswordInput'
import FormButton from '../components/FormButton'
import CloseWidget from '../components/CloseWidget'
import checkIcon from '../assets/correct.svg'
import { updateUser } from '../api'
import RouteContext from '../providers/ContextProvider'

export default function Home() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { address, navigateTo } = useContext(RouteContext)

  const { isPending, mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess() {
      navigateTo('recover-pin')
    },
  })

  const isPasswordValid = password === confirmPassword && password?.length >= 3

  return (
    <motion.div
      className="grid h-full"
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '-100%' }}
      transition={{ type: 'tween' }}
    >
      <div>
        <CloseWidget />
        <h1 className="font-semibold text-3xl mt-3 mb-2 capitalize">
          create password
        </h1>
        <p className="text-sm opacity-80">
          Create a{' '}
          <span className="text-[#57E44B] font-semibold">Six-character</span>{' '}
          password for extra security
        </p>
        <form
          method="GET"
          onSubmit={e => {
            e.preventDefault()

            const data = mutate({ wallet_address: address!, password })

            console.log(data)
          }}
          className="mt-8"
        >
          <PasswordInput
            label="enter password"
            htmlFor="password"
            onChange={e => {
              setPassword(e.target.value)
            }}
          />
          <PasswordInput
            label="re-enter password"
            htmlFor="password"
            onChange={e => {
              setConfirmPassword(e.target.value)
            }}
          >
            {isPasswordValid && (
              <img
                src={checkIcon}
                alt="correct"
                className="w-4 object-contain"
              />
            )}
          </PasswordInput>
          <div className="flex items-start gap-2 text-sm">
            <p>*</p>
            <p>
              Make sure it&apos;s a memorable one or you could just write it
              down somewhere safe
            </p>
          </div>
          <FormButton
            className="mt-8 disabled:cursor-not-allowed"
            disabled={!password.trim().length || password !== confirmPassword}
            isLoading={isPending}
          >
            {isPending ? 'checking' : 'check'}
          </FormButton>
        </form>
      </div>
      <img className="mt-auto mx-auto my-4" src={logo} alt="seichat logo" />
    </motion.div>
  )
}
