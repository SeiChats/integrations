import newMessageImg from '../assets/new-message.svg'
import nftBG from '../assets/nft-bg.png'
import SearchBar from '../components/SearchBar'

const Messages = function () {
  return (
    <>
      <SearchBar />
      <div className="h-full grid place-content-center relative">
        <div>
          <img src={nftBG} alt="no messages" />
          <p className="capitalize font-semibold mt-4 mb-3">no new messages</p>
          <button className="bg-black capitalize outline-none border-none rounded-full px-5 py-3 cursor-pointer text-sm">
            send message
          </button>
        </div>
        {/* TODO change link to button */}
        <a
          href="/"
          className="bg-[#CF3A46] cursor-pointer p-2 w-max rounded-[50%] z-10 absolute
        inset-[auto_0_1em_auto]"
        >
          <img src={newMessageImg} alt="new message" />
        </a>
      </div>
    </>
  )
}

export default Messages
