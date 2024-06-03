import FormButton from '../components/FormButton'
import PasswordInput from '../components/PasswordInput'

const EnterPin = function () {
  return (
    <>
      <PasswordInput label="enter password" htmlFor="password" />
      <FormButton>Let me in!</FormButton>
    </>
  )
}

export default EnterPin
