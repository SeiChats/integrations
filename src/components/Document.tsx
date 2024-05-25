import { AnimatePresence, motion } from 'framer-motion'
import pdf from '../assets/pdf.svg'
import imageFile from '../assets/image-file.svg'
import cancelIcon from '../assets/cancel.svg'

interface Props {
  name: string
  size: string
  imageUrl: string
  index: number
  type?: 'image' | 'file' | string
  handleDelete: () => void
}
const DocumentCard = ({
  name,
  size,
  index,
  type,
  imageUrl,
  handleDelete,
}: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{
          delay: 0.3 * index,
          type: 'spring',
        }}
        onClick={e => {
          e.stopPropagation()
        }}
        title={name}
        className="card relative cursor-default rounded-md bg-white/20 border border-white/20 flex items-center justify-center gap-1 group/card mb-4 w-full"
      >
        <div className="card-content w-full p-4 h-full grid grid-rows-[1fr] grid-cols-[auto_1fr_auto] items-center gap-4 ">
          {type === 'image' ? (
            <img
              src={imageUrl ?? imageFile}
              alt="docs"
              className="size-[30px] min-[388px]:size-[21px]  sm:size-[32px] xl:size-[40px] object-contain rounded xl:rounded-md"
            />
          ) : (
            <img
              src={pdf}
              alt="docs"
              className="w-[30px] min-[388px]:w-[17px] min-[388px]:h-[21px] sm:w-[25px] sm:h-[32px] object-cover"
            />
          )}

          <div className="flex flex-col justify-between sm:gap-y-2 min-[388px]:gap-y-1 gap-y-2">
            <p
              className="font-[300] max-w-[214px] whitespace-nowrap overflow-hidden text-ellipsis"
              title={name}
            >
              {name}
            </p>
            <span className="font-[200] text-xs">{size}</span>
          </div>
          <button
            type="button"
            aria-label="Send message"
            className="hover:text-[#FF9393] hover:bg-transparent"
            onClick={handleDelete}
          >
            <img src={cancelIcon} alt="close" onClick={handleDelete} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default DocumentCard
