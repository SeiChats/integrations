import { motion } from 'framer-motion'

import pdf from '../assets/pdf.svg'
import imageFile from '../assets/image-file.svg'
import { shrinkString } from '../utils/utils'

interface Props {
  name: string
  fileUrl: string
  index: number
  type?: 'image' | 'file' | string
}
const SentDocumentCard = ({ name, index, type, fileUrl }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{
        delay: 0.3 * index,
        type: 'spring',
      }}
      className="card relative w-full max-w-[150]x min-[400px]:max-w-[170px]x sm:max-w-[300px]  h-[60px] sm:h-[80px] rounded-md bg-white/20 border border-white/20 flex items-center justify-center px-2 min-[500px]:px-2 sm:pr-3 py-1 md:pr-[18px] md:py-[6px] gap-1 group/card"
    >
      <div className="card-content w-full h-full flex items-center justify-between ">
        <div className="flex items-center justify-between gap-x-3  md:gap-x-4 relative">
          {type === 'image' ? (
            <img
              src={fileUrl ?? imageFile}
              alt="docs"
              className="size-[60px] object-contain rounded xl:rounded-md"
            />
          ) : (
            <img
              src={pdf}
              alt="docs"
              className="size-[60px] object-contain rounded xl:rounded-md"
            />
          )}

          <div className="flex flex-col justify-between sm:gap-y-2 min-[388px]:gap-y-1 gap-y-2 text-sm md:text-base">
            <p className="font-[300] hidden sm:block">
              {shrinkString({ address: name, useDot: true, prefixLength: 10 })}
            </p>
            <p className="font-[300] sm:hidden">
              {shrinkString({ address: name, useDot: true, prefixLength: 16 })}
            </p>
          </div>
        </div>
        <a
          href={fileUrl}
          target="_blank"
          download={name}
          rel="noopener noreferrer"
          aria-label="download file"
          className="hover:text-[#FF9393] hover:bg-transparent"
        >
          {/* <Download /> TODO replace with download icon */}
        </a>
      </div>
    </motion.div>
  )
}

export default SentDocumentCard
