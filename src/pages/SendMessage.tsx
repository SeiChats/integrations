import { QueryClient, useMutation } from '@tanstack/react-query'
import { useContext, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import minimizeIcon from '../assets/minus.svg'
import closeIcon from '../assets/cancel.svg'
import trashIcon from '../assets/trash.svg'
import MessagingWidget from '../components/MessagingWidget'
import SearchBar from '../components/SearchBar'
import Footer from '../components/Footer'
import RouteContext from '../providers/ContextProvider'
import { handleSendMessage } from '../api'
import DocumentCard from '../components/Document'
import { Progress } from '../components/shadcn/ui/progress'

interface FileData {
  url: string
  type: string
  name: string
  size: string
  id: string
  CID: any
}

const SendMessage = function () {
  const { address } = useContext(RouteContext)
  const [sendTo, setSendTo] = useState('')
  const subjectInputRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const [fileList, setFileList] = useState<FileData[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<(File & { id: string })[]>(
    []
  )
  const [uploadProgress, setUploadProgress] = useState(0)

  const queryClient = new QueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: handleSendMessage,
    onSuccess(data) {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: [address, 'messages-sent'] })
    },
  })

  const disabled = !sendTo.length

  return (
    <div className="grid grid-rows-[1fr_auto] h-full">
      <div className="p-6 grid grid-rows-[auto_1fr] h-full">
        <SearchBar />
        <div className="bg-[#141717] p-4 rounded-[13.62px_13.62px_0px_0px] grid grid-rows-[auto_auto_auto_auto_1fr_auto] h-full">
          <div className="flex items-center gap-4 justify-end">
            <img src={minimizeIcon} alt="minimize" className="cursor-pointer" />
            <img src={closeIcon} alt="close" className="cursor-pointer" />
          </div>
          <div>
            <p className="capitalize text-sm flex items-center gap-4">
              from:
              <span>
                {address?.slice(0, 5)}....{address?.slice(37)}
              </span>
            </p>
          </div>
          <div className="relative pt-4 mt-4">
            <Divider />
            <p className="capitalize text-sm flex items-center gap-4">
              to:
              <input
                onBlur={e => {
                  setSendTo(e.target.value)
                  const address = e.target.value.trim()
                  if (address.length < 37) return
                  e.target.value = `${address?.slice(0, 5)}....${address?.slice(
                    37
                  )}`
                }}
                onFocus={e => {
                  e.target.value = sendTo
                }}
                type="text"
                className="border-none outline-none bg-transparent w-full"
              />
            </p>
          </div>
          <div className="relative py-4 mt-4">
            <Divider />
            <p className="capitalize text-sm flex items-center gap-4">
              subject:
              <input
                ref={subjectInputRef}
                type="text"
                className="border-none outline-none bg-transparent w-full"
              />
            </p>
            <Divider position="bottom" />
          </div>
          <div
            className="relative mt-4 max-h-[119px] overflow-y-auto overflow__bar cursor-text"
            onClick={() => messageRef.current?.focus()}
          >
            <textarea
              ref={messageRef}
              onKeyUp={e => {
                const target = e.target as HTMLTextAreaElement
                target.style.height = 'auto'
                const scHeight = target.scrollHeight
                target.style.height = `${scHeight}px`
              }}
              className="resize-none w-full border-none outline-none bg-transparent "
            />
            {uploadProgress !== 0 && uploadProgress !== 100 && (
              <Progress value={uploadProgress} />
            )}
            <div>
              {fileList.map((file, index) => (
                <DocumentCard
                  key={file.id}
                  name={file.name}
                  size={file.size}
                  type={file.type}
                  imageUrl={file.url}
                  index={index}
                  handleDelete={function () {
                    setFileList(prev => {
                      return prev.filter(prevFile => prevFile.id !== file.id)
                    })
                    setUploadedFiles(prev => {
                      return prev.filter(prevFile => prevFile.id !== file.id)
                    })
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between relative pt-4 mt-4">
            <Divider />
            <button
              disabled={disabled}
              className="flex items-center gap-2 text-sm text-[#D6D6D6] disabled:cursor-not-allowed disabled:opacity-80"
            >
              <span className="p-2 bg-[#FFA7A733] rounded-lg">
                <img src={trashIcon} alt="save to draft" className="w-4" />
              </span>
              Save as Draft
            </button>
            <MessagingWidget
              setUploadProgress={setUploadProgress}
              isLoading={isPending}
              disabled={disabled}
              setFileList={setFileList}
              fileList={fileList}
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              onSend={() => {
                if (subjectInputRef.current?.value.trim() === '') {
                  subjectInputRef.current.focus()
                  return
                }
                if (messageRef.current?.value.trim() === '') {
                  messageRef.current.focus()
                  return
                }
                mutate({
                  message: messageRef.current!.value,
                  receiver: sendTo,
                  subject: subjectInputRef.current!.value,
                  fileUrls: fileList,
                })
              }}
            />
          </div>
        </div>
      </div>
      <Footer className="bg-[#141717] p-6 pt-0" />
    </div>
  )
}

const Divider = function ({
  position = 'top',
}: {
  position?: 'top' | 'bottom'
}) {
  return (
    <div
      className={twMerge(
        'absolute bg-[#FFFFFF0F] h-[1px]',
        position === 'top'
          ? 'inset-[0_-16px_auto_-16px] '
          : 'inset-[auto_-16px_0_-16px] '
      )}
    />
  )
}

export default SendMessage
