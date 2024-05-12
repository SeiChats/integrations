import DropDown from '@/components/DropDownInput'
import FormButton from '@/components/FormButton'
import PasswordInput from '@/components/PasswordInput'

const RecoverPin = function () {
  return (
    <>
      <DropDown
        label="select type"
        htmlFor="secret-question"
        placeholder="Choose a secret question"
        options={[
          "What's your Nickname?",
          'How much was your first loss in web3?',
          "What's your pet name?",
          "What's your mentors name?",
          'First child name?',
        ]}
      />
      <PasswordInput label="answer" htmlFor="answer" />
      <FormButton>LFG!</FormButton>
    </>
  )
}

export default RecoverPin
