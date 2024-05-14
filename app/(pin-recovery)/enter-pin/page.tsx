import FormButton from '@/components/FormButton'
import PasswordInput from '@/components/PasswordInput'

const EnterPin = function () {
  return (
    <>
      <PasswordInput label="enter pin" htmlFor="pin" />
      <FormButton>Let me in!</FormButton>
    </>
  )
}

export default EnterPin
