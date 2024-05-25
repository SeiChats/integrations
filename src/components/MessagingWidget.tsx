import attachmentIcon from '../assets/attachment.svg'
import galleryIcon from '../assets/gallery.svg'
import arrow from '../assets/arrow.svg'
import { twMerge } from 'tailwind-merge'
import LoadingSpinner from './LoadingSpinner'
// import { handleUploadFiles } from '../api'
import { useEffect, useRef } from 'react'
import { formatFileSize, generateId } from '../utils/utils'
import axios from 'axios'

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
  setUploadProgress: React.Dispatch<React.SetStateAction<number>>
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
  setUploadProgress,
}: MessagingWidgetProps) {
  const imageRef = useRef<HTMLInputElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleUploadFiles = async function (files: (File & { id: string })[]) {
    const selectedFiles = files.filter(
      file => !fileList.some(fileData => fileData.id === file.id)
    )
    if (!selectedFiles) return

    console.log(selectedFiles)

    const newFiles = Array.from(selectedFiles)
      .filter(file => file.size <= 4000000) // Filter out files larger than 4MB
      .map(file => ({
        data: file,
        name: file.name,
        size: formatFileSize(file.size),
        id: file.id,
        path: URL.createObjectURL(file),
        type: file.type.toLowerCase().startsWith('image') ? 'image' : 'file',
      }))

    if (selectedFiles.length > newFiles.length) {
      // At least one file was filtered out due to size
      console.log(
        `${selectedFiles.length - newFiles.length} File size exceeds 4MB`
      )
    }

    let fileData: {
      url: string
      type: string
      name: string
      size: string
      id: string
      CID: any
    }[] = []

    for (const file of newFiles) {
      const data = new FormData()
      data.set('file', file.data)
      data.set('file_type', file.type!)
      data.set('file_name', file.name)
      data.set('file_size', file.size)
      data.set('name', file.name)

      const len = data.get('length') as unknown as number
      const formFile: File | null = data.get('file') as unknown as File
      data.append('file', formFile)
      const file_type: string | null = data.get(
        'file_type'
      ) as unknown as string
      const file_name: string | null = data.get(
        'file_name'
      ) as unknown as string
      const file_size: string | null = data.get(
        'file_size'
      ) as unknown as string

      Array.from({ length: Number(len) }).forEach((_, i) => {
        const name: string | null = data.get('name' + i) as unknown as string

        data.append(
          'pinataMetadata',
          JSON.stringify({
            name,
            keyvalues: {
              file_type: file_type,
            },
          })
        )
      })

      const res = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT_KEY}`,
          },
          onUploadProgress(progressEvent) {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!
            )
            setUploadProgress(percent)
          },
        }
      )

      const { IpfsHash } = res.data
      console.log(IpfsHash, file_type)
      const fileUrl = `${import.meta.env.VITE_PINATA_URL}`

      fileData = [
        ...fileData,
        {
          url: `${fileUrl}${IpfsHash}`,
          type: file_type,
          name: file_name,
          size: file_size,
          CID: IpfsHash,
          id: file.id,
        },
      ]
    }

    return fileData
  }

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

      setFileList(prev => [...files!, ...prev])
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

              return [...newFiles, ...prev]
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

              return [...newFiles, ...prev]
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
