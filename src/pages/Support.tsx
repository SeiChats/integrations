import attachmentIcon from '../assets/attachment.svg'
import galleryIcon from '../assets/gallery.svg'
import arrow from '../assets/arrow.svg'
import nftBG from '../assets/nft-bg.png'
import { twMerge } from 'tailwind-merge'

const Support = function () {
  return (
    <>
      <div className="grid place-content-center">
        <img src={nftBG} alt="no messages" />
        <p className="capitalize mt-2 text-center text-lg">sei something!</p>
      </div>
      <div className="relative">
        <textarea
          name="send-message"
          id="message"
          placeholder="send message"
          className="bg-transparent shadow-[0px_0px_14.26px_1.45px_#00000012] outline-none border border-white/20 resize-none h-[130px] placeholder:capitalize p-3 rounded-2xl overflow__bar text-white/80 block w-full"
        />
        <div className="flex items-center bg-[#191D1D] p-2 rounded-full gap-4 w-max absolute inset-[auto_1em_1em_auto]">
          <label htmlFor="image-upload" className="cursor-pointer block">
            <img src={galleryIcon} alt="upload" className="w-4" />
            <input
              type="file"
              id="image-upload"
              name="image-upload"
              accept="image/*"
              className="hidden"
              multiple
            />
          </label>
          <label htmlFor="file-upload" className="cursor-pointer block">
            <img src={attachmentIcon} alt="attachment" className="w-4" />
            <input
              type="file"
              name="file-upload"
              id="file-upload"
              accept="application/pdf"
              className="hidden"
              multiple
            />
          </label>
          <div className="w-[1px] h-4 bg-[#D9D9D91A]" />
          <button
            className={twMerge(
              'p-2 rounded-[50%] bg-[#CF3A46] cursor-pointer border-none outline-none'
            )}
          >
            <img src={arrow} alt="send" />
          </button>
        </div>
      </div>
    </>
  )
}

export default Support
