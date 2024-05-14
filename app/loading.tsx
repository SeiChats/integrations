import Image from 'next/image'

const Loading = function () {
  return (
    <div className="min-h-screen grid place-items-center">
      <Image
        src="/seichat.svg"
        alt="seichat logo"
        width={83}
        height={86}
        className="w-20"
      />
    </div>
  )
}

export default Loading
