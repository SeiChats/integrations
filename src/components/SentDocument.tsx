import { motion } from 'framer-motion'

import pdf from '../assets/pdf.svg'
import imageFile from '../assets/image-file.svg'
import downloadIcon from '../assets/download.svg'

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
      className="card relative cursor-default rounded-md bg-white/20 border border-white/20 flex items-center justify-center gap-1 group/card mb-4 w-full mt-4"
    >
      <div className="card-content p-4 w-full grid grid-rows-1 grid-cols-[auto_1fr_auto] gap-4 items-center">
        {type === 'image' ? (
          <img
            src={fileUrl ?? imageFile}
            alt="docs"
            className="size-[30px] object-contain rounded xl:rounded-md"
          />
        ) : (
          <img
            src={pdf}
            alt="docs"
            className="size-[30px] object-contain rounded xl:rounded-md"
          />
        )}

        <div className="flex flex-col justify-between sm:gap-y-2 min-[388px]:gap-y-1 gap-y-2 text-sm md:text-base">
          <p className="font-[300] max-w-[232px] whitespace-nowrap text-ellipsis overflow-hidden">
            {name}
          </p>
        </div>
        <a
          href={fileUrl}
          target="_blank"
          download={name}
          rel="noopener noreferrer"
          aria-label="download file"
          className="hover:text-[#FF9393] hover:bg-transparent"
        >
          <img src={downloadIcon} alt="download" />
        </a>
      </div>
    </motion.div>
  )
}

export default SentDocumentCard
