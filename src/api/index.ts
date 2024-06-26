import Cookies from 'js-cookie'
import { supabase } from '../services/supabase'

import bcrypt from 'bcryptjs'
import axios from 'axios'
import {
  generateId,
  getCurrentTime12HrFormat,
  getCurrentDateFormatted,
  formatFileSize,
} from '../utils/utils'
import {
  addMessageToDraft,
  replyToMessage,
  sendMessage,
  sendMessageToSupport,
} from './contract/contractFunctions'
import crypto from 'crypto-browserify'
import { Buffer } from 'buffer/'

export function encryptPassword(password: string): string {
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)
  return hashedPassword
}

export const insertUser = async (user: any) => {
  Cookies.set('wallet', user.wallet_address, { secure: true })

  try {
    const { data, error } = await supabase
      .from('users')
      .insert({ wallet_address: user.wallet_address })

    if (error) return { status: 500, error }
    return {
      status: 200,
      data,
    }
  } catch (error: any) {
    console.log(error)
    return {
      status: 500,
      details: error.detail ?? '',
      code: Number(error.code),
    }
  }
}

export const lookupUser = async (wallet: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('wallet_address', wallet)
      .single()

    if (error) {
      console.log(error)
      return {
        status: 500,
        error,
      }
    }

    if (!data?.password) {
      throw new Error('No password')
    }
    return {
      data,
      status: 200,
    }
  } catch (error: any) {
    console.log(error)
    return {
      status: 500,
    }
  }
}

export const updateUser = async (data: {
  wallet_address: string
  password: string
}) => {
  const { wallet_address, password } = data
  const cryptoPass = encryptPassword(password) as string
  const { error } = await supabase
    .from('users')
    .update({ password: cryptoPass })
    .eq('wallet_address', wallet_address)

  if (error) return { status: 500 }

  return {
    status: 200,
  }
}

export const addRecoveryAnswer = async (data: {
  question: string
  answer: string
  wallet_address: string
}) => {
  const { wallet_address, question, answer } = data

  try {
    const { error } = await supabase
      .from('users')
      .update({
        recovery_question: question,
        recovery_answer: answer.toLowerCase(),
      })
      .eq('wallet_address', wallet_address)

    if (error) return { status: 500 }

    return {
      status: 200,
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export const login = async function (data: {
  address: string
  password: string
}) {
  const { data: user } = await supabase
    .from('users')
    .select()
    .eq('wallet_address', data.address)
    .single()

  if (!user) {
    throw new Error('User does not exist')
  }

  const isPasswordCorrect = await bcrypt.compare(data.password, user.password)

  return { isPasswordCorrect, hasSecurityQuestion: !!user.recovery_question }
}
export const handleSendMessage = async function (data1: {
  message: string
  subject: string
  receiver: string
  fileUrls: {
    url: string
    type: string
    name: string
    size: string
    CID: any
  }[]
}) {
  const data = {
    payload: JSON.stringify({
      id: generateId(),
      subject: data1.subject,
      message: data1.message,
      attachments: data1.fileUrls,
      createdAt: new Date().toUTCString(),
      time: getCurrentTime12HrFormat(),
      date: getCurrentDateFormatted(),
    }),
  }
  const url = `https://chatbackend-production-9908.up.railway.app/encryption`
  const encryptData = await axios.post(url, data)
  // this is the sendMessage contract function

  const SendMessageContract = await sendMessage({
    receiver: data1.receiver.trim(),
    cipherIv: encryptData.data['iv'],
    encryptedMessage: encryptData.data['encryptedPayload'],
  })
  console.log(SendMessageContract)
}

export const handleUploadFiles = async function (
  files: (File & { id: string })[]
) {
  const selectedFiles = files
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
    console.log(file)
    file.name
    console.log('uploading')
    const data = new FormData()
    data.set('file', file.data)
    data.set('file_type', file.type!)
    data.set('file_name', file.name)
    data.set('file_size', file.size)
    data.set('name', file.name)

    const len = data.get('length') as unknown as number
    const formFile: File | null = data.get('file') as unknown as File
    data.append('file', formFile)
    const file_type: string | null = data.get('file_type') as unknown as string
    const file_name: string | null = data.get('file_name') as unknown as string
    const file_size: string | null = data.get('file_size') as unknown as string

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

    const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT_KEY}`,
      },
      body: data,
    })

    const { IpfsHash } = await res.json()
    console.log(IpfsHash, file_type)
    const fileUrl = `${import.meta.env.VITE_PINATA_URL}`

    console.log(fileUrl)

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

export const handleSaveToDraft = async (payload: {
  message: string
  subject: string
  receiver: string
  address: string
  tag: 'draft' | 'support'
  fileUrls: {
    url: string
    type: string
    name: string
    size: string
    CID: any
  }[]
}) => {
  const data = {
    payload: JSON.stringify({
      id: generateId(),
      subject: payload.subject,
      message: payload.message,
      attachments: payload.fileUrls ?? [],
      createdAt: new Date().toUTCString(),
      time: getCurrentTime12HrFormat(),
      date: getCurrentDateFormatted(),
    }),
  }
  const url = `https://chatbackend-production-9908.up.railway.app/encryption`
  try {
    console.log('DATA BEFORE ENCRYPT: ', data)

    const encryptData = await axios.post(url, data)

    console.log(`Message encrypted: `, encryptData.data)

    const resFromDb = await (payload.tag === 'draft'
      ? addMessageToDraft
      : sendMessageToSupport)({
      message_payload: encryptData.data['encryptedPayload'],
      wallet_address: payload.address,
      receiver: payload.receiver.trim(),
      cipherIv: encryptData.data['iv'],
      timeStamp: Date.now(),
    })

    console.log(resFromDb)
  } catch (err) {
    console.log(err)
  }
}

export async function getAllMessagesbyTag(tag: string, wallet: string) {
  if (!tag) throw new Error('Tag not found')

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('tag', tag)
    .ilike(tag === 'support' ? 'receiver' : 'author', wallet)
  if (error) throw new Error(error.message)

  return data
}

export const getAllDecryptedMessagesByTag = async (data: {
  tag: string
  address: string
}) => {
  const transactionResponse = await getAllMessagesbyTag(data.tag, data.address)

  if (transactionResponse) {
    const url = `https://chatbackend-production-9908.up.railway.app/encryption/decrypt`
    try {
      const MessagesSentBy = transactionResponse.map(async message => {
        try {
          const decryptData = await axios.post(url, {
            iv: message.cipher_iv,
            encryptedData: message.payload,
          })

          const decryptedMessage = {
            sender: message.author,
            receiver: message.receiver,
            message: JSON.parse(decryptData.data['decryptedData']),
            id: message.messageId,
            isRead: message.is_read,
            isLiked: message.is_liked,
            tag: message.tag,
          }
          return decryptedMessage
        } catch (error) {
          console.log(error)
        }
      })
      return await Promise.all(MessagesSentBy)
    } catch (error) {
      console.log(error)
    }
  }
  return transactionResponse
}

export const handleReplyMessage = async (data: {
  message: string
  subject: string
  receiver: string
  messageId: string
  fileUrls: {
    url: string
    type: string
    name: string
    size: string
    CID: any
  }[]
}) => {
  const payload = JSON.stringify({
    id: generateId(),
    message: data.message,
    attachments: data.fileUrls ?? [],
    createdAt: new Date().toUTCString(),
    time: getCurrentTime12HrFormat(),
    date: getCurrentDateFormatted(),
  })

  try {
    const algorithm = `aes-256-cbc`
    const key = import.meta.env.VITE_ENCRYPTION_KEY!

    const iv = crypto.randomBytes(16)

    console.log(key, iv)
    // encrypting the payload using encryption algorithm, private key and initialization vector
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    let encryptedPayload = cipher.update(
      JSON.stringify(payload),
      'utf-8',
      'hex'
    )
    encryptedPayload += cipher.final('hex')

    console.log('PAYLOAD encryptedData', encryptedPayload)
    // converting vector to base64 string
    const base64data = Buffer.from(iv).toString('base64')
    const encryptData = {
      iv: base64data,
      encryptedPayload,
    }

    const SendMessageContract = await replyToMessage({
      receiver: data.receiver.trim(),
      cipherIv: encryptData['iv'],
      encryptedMessage: encryptData['encryptedPayload'],
      parentMessageId: data.messageId,
    })
    console.log(SendMessageContract)
  } catch (err) {
    console.log(err)
  }
}
