import { useContext, useState } from 'react'

import DropDown from '../components/DropDownInput'
import FormButton from '../components/FormButton'
import PasswordInput from '../components/PasswordInput'
import RouteContext from '../providers/ContextProvider'
import { useMutation } from '@tanstack/react-query'
import { addRecoveryAnswer } from '../api'

const RecoverPin = function () {
  const [selectedOption, setSelectedOption] = useState<string>()
  const [answer, setAnswer] = useState<string>()
  const { address } = useContext(RouteContext)
  const { mutate, isPending } = useMutation({
    mutationFn: addRecoveryAnswer,
  })

  return (
    <>
      <DropDown
        label="select type"
        htmlFor="secret-question"
        placeholder="Choose a secret question"
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        options={[
          "What's your Nickname?",
          'How much was your first loss in web3?',
          "What's your pet name?",
          "What's your mentor's name?",
          'First child name?',
        ]}
      />
      <PasswordInput
        label="answer"
        htmlFor="answer"
        onChange={e => setAnswer((e.target as HTMLInputElement).value)}
      />
      <FormButton
        isLoading={isPending}
        disabled={
          !(selectedOption?.trim().length && answer?.trim().length) || isPending
        }
        onClick={() => {
          const data = mutate({
            question: selectedOption!,
            answer: answer!,
            wallet_address: address!,
          })

          console.log(data)
        }}
      >
        LFG!
      </FormButton>
    </>
  )
}

export default RecoverPin
