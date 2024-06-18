import integrateBtnImage from '../assets/integrate-image.png'

const UnregisteredSupport = function () {
  return (
    <div>
      <h1 className="text-sm font-semibold">Support Feature Unavailable</h1>
      <div className="h-[1px] w-full bg-white/10 my-4" />
      <p>
        It looks like you're not registered for our support feature. To gain
        access, please visit our support{' '}
        <a href="https://www.seichats.com/docs" className="underline">
          registration page
        </a>{' '}
        and click on the "integrate now" button.
      </p>
      <img
        src={integrateBtnImage}
        alt="integrate-now"
        className="my-4 rounded-[4px]"
      />
      <p className="text-sm opacity-80 mt-4">
        ⚠️ Warning: This message only appears during development.
      </p>
    </div>
  )
}

export default UnregisteredSupport
