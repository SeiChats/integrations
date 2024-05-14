import DropDown from '../components/DropDownInput'
import FormButton from '../components/FormButton'
import PasswordInput from '../components/PasswordInput'

const RecoverPin = function () {
  return (
    <>
      <DropDown
        label="select type"
        htmlFor="secret-question"
        placeholder="Choose a secret question"
        options={[
          'Whats your Nickname?',
          'How much was your first loss in web3?',
          'Whats your pet name?',
          'Whats your mentors name?',
          'First child name?',
        ]}
      />
      <PasswordInput label="answer" htmlFor="answer" />
      <FormButton>LFG!</FormButton>
    </>
  )
}

export default RecoverPin
