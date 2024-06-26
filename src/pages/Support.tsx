import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { useMutation, useQueries } from '@tanstack/react-query'

import attachmentIcon from '../assets/attachment.svg'
import galleryIcon from '../assets/gallery.svg'
import arrow from '../assets/arrow.svg'
import nftBG from '../assets/nft-bg.png'
import {
  getAllDecryptedMessagesByTag,
  handleSaveToDraft,
  handleUploadFiles,
} from '@/api'
import RouteContext from '@/providers/ContextProvider'
import LoadingSpinner from '@/components/LoadingSpinner'
import SentSupportMessage from '@/components/SentSupportMessage'
import ReceivedSupportMessage from '@/components/ReceivedSupportMessage'
import { formatDate, generateId, isSameDay } from '@/utils/utils'
import { queryClient } from '@/providers/QueryProvider'
import seichatLogo from '../assets/seichat.svg'
import { motion } from 'framer-motion'

const Support = function () {
  const { address, route, seichatConfig } = useContext(RouteContext)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const bottomDiv = useRef<HTMLDivElement>(null)

  const isAdmin =
    address!.toLowerCase() === seichatConfig!.address.toLowerCase()

  const userAddress = route.split('/')[1]

  // eslint-disable-next-line prefer-const
  let { data, isLoading } = useQueries({
    queries: [
      {
        queryKey: [isAdmin ? userAddress : address, 'support-messages'],
        queryFn: () =>
          getAllDecryptedMessagesByTag({
            tag: 'support',
            address: isAdmin ? userAddress : address!,
          }),
      },
      {
        queryKey: [seichatConfig!.address, 'support-messages'],
        queryFn: () =>
          getAllDecryptedMessagesByTag({
            tag: 'support',
            address: seichatConfig!.address,
          }),
        refetchInterval: 3 * 1000,
      },
    ],
    combine: results => {
      return {
        data: results.map(result => result.data),
        isLoading: results.some(result => result.isPending),
      }
    },
  })

  console.log(data)

  if (!isLoading) {
    data = data
      ?.flat()
      .sort(
        (a, b) =>
          new Date(a.message.createdAt).getTime() -
          new Date(b.message.createdAt).getTime()
      )
  }

  const { mutate, isPending } = useMutation({
    mutationFn: handleSaveToDraft,
    mutationKey: [address, 'support'],
    onSuccess() {
      messageRef.current!.value = ''
      queryClient.invalidateQueries({
        queryKey: [isAdmin ? userAddress : address!, 'support-messages'],
      })
    },
  })

  useEffect(() => {
    bottomDiv.current?.scrollIntoView()
  }, [])

  const handleSendFile = async function (file: File & { id: string }) {
    console.log(file)
    file.id = generateId()

    console.log(file)
    const fileData = await handleUploadFiles([file])

    return fileData
  }

  const [isDisabled, setIsDisabled] = useState(true)

  return isLoading ? (
    <div className="h-full grid place-items-center">
      <motion.img
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ repeat: Infinity, duration: 0.5, repeatType: 'reverse' }}
        src={seichatLogo}
        alt="seichat logo"
        className="w-16 block"
      />
    </div>
  ) : (
    <>
      {data?.flat().length !== 0 && !isLoading && (
        <div className="max-h-[347px] overflow-y-auto overflow__bar">
          {data.flat().map((message, idx, arr) => {
            const prev = arr[idx - 1]
            const isSameDate = isSameDay(
              new Date(message.message.createdAt).getTime(),
              new Date(prev?.message.createdAt).getTime()
            )
            return (
              <Fragment
                key={
                  message.message.id +
                  new Date(message.message.createdAt).getTime()
                }
              >
                {!isSameDate && (
                  <NewDay
                    key={new Date(message.message.createdAt).getTime()}
                    timeStamp={new Date(message.message.createdAt).getTime()}
                  />
                )}
                {message.sender === address ? (
                  <SentSupportMessage
                    key={message.message.id}
                    message={message.message.message}
                    time={message.message.time}
                    attachment={message.message.attachments}
                    sender={message.sender}
                  />
                ) : (
                  <ReceivedSupportMessage
                    key={message.message.id}
                    message={message.message.message}
                    time={message.message.time}
                    attachment={message.message.attachments}
                    sender={message.sender}
                  />
                )}
              </Fragment>
            )
          })}
          <div ref={bottomDiv} />
        </div>
      )}
      {data?.flat().length == 0 && (
        <div className="grid place-content-center">
          <img src={nftBG} alt="no messages" />
          <p className="capitalize mt-2 text-center text-lg">sei something!</p>
        </div>
      )}
      <div className="relative">
        <textarea
          name="send-message"
          ref={messageRef}
          onChange={e => {
            setIsDisabled(e.target.value.trim() === '')
          }}
          id="message"
          placeholder="send message"
          className="bg-transparent mt-4 shadow-[0px_0px_14.26px_1.45px_#00000012] outline-none border border-white/20 resize-none h-[130px] placeholder:capitalize p-3 rounded-2xl overflow__bar text-white/80 block w-full"
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
              onChange={async e => {
                const file = e.target.files?.[0]

                console.log(file)
                messageRef.current!.value = 'uploading file...'
                messageRef.current!.disabled = true

                try {
                  //@ts-ignore
                  const fileData = (await handleSendFile(file))!

                  mutate({
                    address: address!,
                    fileUrls: fileData,
                    message: messageRef.current!.value,
                    receiver: isAdmin ? userAddress : seichatConfig!.address,
                    subject: 'support',
                    tag: 'support',
                  })
                } catch (err) {
                  console.log(err)
                } finally {
                  messageRef.current!.value = ''
                  messageRef.current!.disabled = false
                }
              }}
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
              onChange={async e => {
                const file = e.target.files?.[0]

                console.log(file)
                messageRef.current!.value = 'uploading file...'
                messageRef.current!.disabled = true

                try {
                  //@ts-ignore
                  const fileData = (await handleSendFile(file))!

                  mutate({
                    address: address!,
                    fileUrls: fileData,
                    message: messageRef.current!.value,
                    receiver: isAdmin ? userAddress : seichatConfig!.address,
                    subject: 'support',
                    tag: 'support',
                  })
                } catch (err) {
                  console.log(err)
                } finally {
                  messageRef.current!.value = ''
                  messageRef.current!.disabled = false
                }
              }}
            />
          </label>
          <div className="w-[1px] h-4 bg-[#D9D9D91A]" />
          <button
            className="p-2 rounded-[50%] bg-[#CF3A46] cursor-pointer border-none outline-none disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isDisabled}
            onClick={() => {
              mutate({
                address: address!,
                fileUrls: [],
                message: messageRef.current!.value,
                receiver: isAdmin ? userAddress : seichatConfig!.address,
                subject: 'support',
                tag: 'support',
              })
            }}
          >
            {isPending ? (
              <LoadingSpinner radii={20} ringWidth={3} ringColor="#ffffff" />
            ) : (
              <img src={arrow} alt="send" />
            )}
          </button>
        </div>
      </div>
    </>
  )
}

const NewDay = function ({ timeStamp }: { timeStamp: number }) {
  return (
    <div className="relative my-4">
      <p className="w-max mx-auto text-sm text-white/70 bg-[#141717] px-3 relative z-10">
        {formatDate(timeStamp)}
      </p>
      <div className="absolute inset-[50%_0_auto_0] translate-y--1/2 h-[1px] bg-white/30" />
    </div>
  )
}

export default Support
