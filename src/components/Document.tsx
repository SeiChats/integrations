import { AnimatePresence, motion } from 'framer-motion'
import pdf from '../assets/pdf.svg'
import imageFile from '../assets/image-file.svg'
import { shrinkString } from '../utils/utils'
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
  console.log(name, ':', type)
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
        className="card relative  max-w-[150]x min-[400px]:max-w-[170px]x sm:max-w-[257px] h-[70px] min-[388px]:h-[55px] sm:h-[70px] rounded-md bg-white/20 border border-white/20 flex items-center justify-center px-2 min-[388px]:px-1 min-[500px]:px-2 sm:pr-3 py-1 md:pr-[18px] md:py-[6px] gap-1 group/card mb-4"
      >
        <div className="card-content w-full h-full flex items-center justify-between ">
          <div className="flex items-center justify-between gap-x-3 min-[388px]:gap-x-2 md:gap-x-4 relative">
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
                width={25}
                height={32}
                className="w-[30px] min-[388px]:w-[17px] min-[388px]:h-[21px] sm:w-[25px] sm:h-[32px] object-cover"
              />
            )}

            <div className="flex flex-col justify-between sm:gap-y-2 min-[388px]:gap-y-1 gap-y-2">
              <p className="font-[300]">
                {shrinkString({ address: name, useDot: true, prefixLength: 6 })}
              </p>
              <span className="font-[200] text-xs ">{size}</span>
            </div>
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
