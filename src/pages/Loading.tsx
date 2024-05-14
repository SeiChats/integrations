import seichatLogo from '../assets/seichat.svg'

const Loading = function () {
  return (
    <div className="min-h-screen grid place-items-center">
      <img src={seichatLogo} alt="seichat logo" className="w-20 block" />
    </div>
  )
}

export default Loading
