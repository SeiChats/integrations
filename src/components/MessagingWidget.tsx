import attachmentIcon from '../assets/attachment.svg'
import galleryIcon from '../assets/gallery.svg'
import arrow from '../assets/arrow.svg'
import { twMerge } from 'tailwind-merge'
import LoadingSpinner from './LoadingSpinner'
import { handleUploadFiles } from '../api'
import { useEffect, useRef } from 'react'
import { generateId } from '../utils/utils'

interface MessagingWidgetProps {
  className?: string
  onSend?: () => void
  disabled?: boolean
  isLoading?: boolean
  fileList: {
    url: string
    type: string
    name: string
    size: string
    id: string
    CID: any
  }[]
  uploadedFiles: (File & {
    id: string
  })[]
  setFileList: React.Dispatch<
    React.SetStateAction<
      {
        url: string
        type: string
        name: string
        size: string
        id: string
        CID: any
      }[]
    >
  >
  setUploadedFiles: React.Dispatch<
    React.SetStateAction<
      (File & {
        id: string
      })[]
    >
  >
}

const MessagingWidget = function ({
  className,
  onSend,
  disabled,
  isLoading,
  uploadedFiles,
  setUploadedFiles,
  fileList,
  setFileList,
}: MessagingWidgetProps) {
  const imageRef = useRef<HTMLInputElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    imageRef.current!.value = ''
    fileRef.current!.value = ''
    ;(async function () {
      const isFileListUpdated = !uploadedFiles.every(file =>
        fileList.some(fileData => fileData.id === file.id)
      )

      if (!isFileListUpdated) return

      const files = await handleUploadFiles(uploadedFiles)
      if (files?.length === 0) return

      setFileList(files!)
    })()
  }, [uploadedFiles.length])

  return (
    <div
      className={twMerge(
        'flex items-center bg-[#191D1D] p-2 rounded-full gap-4 w-max',
        className
      )}
    >
      <label htmlFor="image-upload" className="cursor-pointer block">
        <img src={galleryIcon} alt="upload" className="w-4" />
        <input
          type="file"
          id="image-upload"
          name="image-upload"
          ref={imageRef}
          accept="image/*"
          className="hidden"
          onChange={e => {
            setUploadedFiles(prev => {
              const prevIdentifiers = prev.map(
                file => `${file.name}-${file.lastModified}-${file.size}`
              )

              const newFiles = (
                Array.from((e.target as HTMLInputElement).files!) as (File & {
                  id: string
                })[]
              )
                .filter(
                  file =>
                    !prevIdentifiers.includes(
                      `${file.name}-${file.lastModified}-${file.size}`
                    )
                )
                .map(file => {
                  file.id = generateId()
                  return file
                })

              return [...prev, ...newFiles]
            })
          }}
          multiple
        />
      </label>
      <label htmlFor="file-upload" className="cursor-pointer block">
        <img src={attachmentIcon} alt="attachment" className="w-4" />
        <input
          type="file"
          name="file-upload"
          id="file-upload"
          ref={fileRef}
          accept="application/pdf"
          onChange={e => {
            setUploadedFiles(prev => {
              const prevIdentifiers = prev.map(
                file => `${file.name}-${file.lastModified}-${file.size}`
              )

              const newFiles = (
                Array.from((e.target as HTMLInputElement).files!) as (File & {
                  id: string
                })[]
              )
                .filter(
                  file =>
                    !prevIdentifiers.includes(
                      `${file.name}-${file.lastModified}-${file.size}`
                    )
                )
                .map(file => {
                  file.id = generateId()
                  return file
                })

              return [...prev, ...newFiles]
            })
          }}
          className="hidden"
          multiple
        />
      </label>
      <div className="w-[1px] h-4 bg-[#D9D9D91A]" />
      <button
        className={twMerge(
          'p-2 rounded-[50%] bg-[#CF3A46] cursor-pointer border-none outline-none',
          (isLoading || disabled) && 'cursor-not-allowed opacity-65'
        )}
        disabled={isLoading || disabled}
        onClick={onSend}
      >
        {isLoading ? (
          <LoadingSpinner radii={20} ringWidth={3} ringColor="#ffffff" />
        ) : (
          <img src={arrow} alt="send" />
        )}
      </button>
    </div>
  )
}

export default MessagingWidget
