import { getContract } from './getContract'
import { ethers } from 'ethers'
import axios from 'axios'

interface sendMessageDTO {
  receiver: string
  cipherIv: string
  encryptedMessage: string
}
interface replyMessageDTO {
  receiver: string
  parentMessageId: any
  cipherIv: string
  encryptedMessage: string
}

// send message
export const sendMessage = async (data: sendMessageDTO) => {
  const receiver = data.receiver
  const cipherIv = data.cipherIv
  const message = data.encryptedMessage
  try {
    await window.ethereum?.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xae3f3' }],
    })

    const contract = await getContract()
    if (contract) console.log(contract)

    const transactionResponse = await contract.sendMessage(
      receiver,
      cipherIv,
      message
    )

    return transactionResponse
  } catch (error) {
    console.log(error)
    throw error
  }
}

// delete message
export const deleteMessage = async (messageId: any) => {
  try {
    const contract = await getContract()

    const transactionResponse = await contract.deleteMessage(messageId)

    return transactionResponse
  } catch (error) {
    console.log(error)
    throw error
  }
}

// reply a mesage
export const replyToMessage = async (data: replyMessageDTO) => {
  const receiver = data.receiver
  const parentId = data.parentMessageId
  const cipherIv = data.cipherIv
  const message = data.encryptedMessage

  try {
    const contract = await getContract()
    if (contract) console.log(contract)

    const transactionResponse = await contract.replyToMessage(
      receiver,
      parentId,
      cipherIv,
      message
    )

    return transactionResponse
  } catch (error) {
    console.log(error)
    throw error
  }
}

// delete replymessage
export const deleteReply = async (parentMessageId: any, replyIndex: any) => {
  const contract = await getContract()

  const transactionResponse = await contract.deleteReply(
    parentMessageId,
    replyIndex
  )

  return transactionResponse
}

// move a messageto Trash
export const moveToTrash = async ({ messageId }: { messageId: string }) => {
  const contract = await getContract()
  if (contract) console.log(contract)

  const transactionResponse = await contract.moveToTrash(messageId)
  console.log(transactionResponse)

  return transactionResponse
}

// move a  remove message from Trash
export const removeFromTrash = async (messageId: any) => {
  const contract = await getContract()
  if (contract) console.log(contract)

  const transactionResponse = await contract.removeFromTrash(messageId)

  return transactionResponse
}

// mark message as read
export const isRead = async (messageId: any) => {
  const contract = await getContract()
  if (contract) console.log(contract)

  const transactionResponse = await contract.isRead(messageId)

  return transactionResponse
}

// to get all messages sent by a user
export const getMessagesSentBy = async () => {
  const contract = await getContract()

  const transactionResponse = await contract.getMessagesSentBy()

  console.log(transactionResponse)
  if (transactionResponse) {
    const url = `https://chatbackend-production-9908.up.railway.app/encryption/decrypt`
    try {
      const MessagesSentBy = transactionResponse.map(async (message: any) => {
        try {
          const decryptData = await axios.post(url, {
            iv: message.cipherIv,
            encryptedData: message.encryptedMessage,
          })
          // check if the message has replies and decrypt
          if (message.replies.length !== 0) {
            const Replies = message.replies.map(async (reply: any) => {
              try {
                const decryptedReply = await axios.post(url, {
                  iv: reply.cipherIv,
                  encryptedData: reply.encryptedMessage,
                })
                return {
                  parentMessageId: reply.parentMessageId.toString(),
                  sender: reply.sender,
                  receiver: reply.receiver,
                  decryptedreply: JSON.parse(
                    decryptedReply.data['decryptedData']
                  ),
                  deletedBySender: reply.deletedBySender,
                  deletedByReceiver: reply.deletedByReceiver,
                  movedToTrashBySender: reply.movedToTrashBySender,
                  movedToTrashByReceiver: reply.movedToTrashByReceiver,
                  isReadByReceiver: reply.isReadByReceiver,
                  timestamp: reply.timestamp.toString(),
                }
              } catch (error) {
                console.log(error)
                throw error
              }
            })
            const decryptedMessage = {
              messageId: message.messageId.toString(),
              sender: message.sender,
              receiver: message.receiver,
              message: JSON.parse(decryptData.data['decryptedData']),
              replies: Replies,
              deletedBySender: message.deletedBySender,
              deletedByReceiver: message.deletedByReceiver,
              movedToTrashBySender: message.movedToTrashBySender,
              movedToTrashByReceiver: message.movedToTrashByReceiver,
              isReadByReceiver: message.isReadByReceiver,
              timestamp: message.timestamp.toString(),
            }
            return decryptedMessage
          } else {
            const decryptedMessage = {
              messageId: message.messageId.toString(),
              sender: message.sender,
              receiver: message.receiver,
              message: JSON.parse(decryptData.data['decryptedData']),
              replies: [],
              deletedBySender: message.deletedBySender,
              deletedByReceiver: message.deletedByReceiver,
              movedToTrashBySender: message.movedToTrashBySender,
              movedToTrashByReceiver: message.movedToTrashByReceiver,
              isReadByReceiver: message.isReadByReceiver,
              timestamp: message.timestamp.toString(),
            }
            return decryptedMessage
          }
        } catch (error) {
          console.log(error)
          throw error
        }
      })
      return await Promise.all(MessagesSentBy)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  return transactionResponse
}

// get messages sent to a user
export const getMessagesReceivedBy = async () => {
  const contract = await getContract()

  const transactionResponse = await contract.getMessagesReceivedBy()
  if (transactionResponse) {
    const url = `https://chatbackend-production-9908.up.railway.app/encryption/decrypt`
    try {
      const MessagesSentBy = transactionResponse.map(async (message: any) => {
        try {
          const decryptData = await axios.post(url, {
            iv: message.cipherIv,
            encryptedData: message.encryptedMessage,
          })
          // check if the message has replies and decrypt
          if (message.replies.length !== 0) {
            const Replies = message.replies.map(async (reply: any) => {
              try {
                const decryptedReply = await axios.post(url, {
                  iv: reply.cipherIv,
                  encryptedData: reply.encryptedMessage,
                })
                return {
                  parentMessageId: reply.parentMessageId.toString(),
                  sender: reply.sender,
                  receiver: reply.receiver,
                  decryptedreply: JSON.parse(
                    decryptedReply.data['decryptedData']
                  ),
                  deletedBySender: reply.deletedBySender,
                  deletedByReceiver: reply.deletedByReceiver,
                  movedToTrashBySender: reply.movedToTrashBySender,
                  movedToTrashByReceiver: reply.movedToTrashByReceiver,
                  isReadByReceiver: reply.isReadByReceiver,
                  timestamp: reply.timestamp.toString(),
                }
              } catch (error) {
                console.log(error)
                throw error
              }
            })
            const decryptedMessage = {
              messageId: message.messageId.toString(),
              sender: message.sender,
              receiver: message.receiver,
              message: JSON.parse(decryptData.data['decryptedData']),
              replies: Replies,
              deletedBySender: message.deletedBySender,
              deletedByReceiver: message.deletedByReceiver,
              movedToTrashBySender: message.movedToTrashBySender,
              movedToTrashByReceiver: message.movedToTrashByReceiver,
              isReadByReceiver: message.isReadByReceiver,
              timestamp: message.timestamp.toString(),
            }
            return decryptedMessage
          } else {
            const decryptedMessage = {
              messageId: message.messageId.toString(),
              sender: message.sender,
              receiver: message.receiver,
              message: JSON.parse(decryptData.data['decryptedData']),
              replies: [],
              deletedBySender: message.deletedBySender,
              deletedByReceiver: message.deletedByReceiver,
              movedToTrashBySender: message.movedToTrashBySender,
              movedToTrashByReceiver: message.movedToTrashByReceiver,
              isReadByReceiver: message.isReadByReceiver,
              timestamp: message.timestamp.toString(),
            }
            return decryptedMessage
          }
        } catch (error) {
          console.log(error)
          throw error
        }
      })
      return await Promise.all(MessagesSentBy)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  return transactionResponse
}

// get messages moved to trash
export const getMessagesMovedToTrash = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum!)
  const address = (await provider.getSigner()).getAddress()
  const contract = await getContract()

  const transactionResponse = await contract.getMessagesMovedToTrash(address)
  if (transactionResponse) {
    const url = `https://chatbackend-production-9908.up.railway.app/encryption/decrypt`
    try {
      const MessagesSentBy = transactionResponse.map(async (message: any) => {
        try {
          const decryptData = await axios.post(url, {
            iv: message.cipherIv,
            encryptedData: message.encryptedMessage,
          })
          // check if the message has replies and decrypt
          if (message.replies.length !== 0) {
            const Replies = message.replies.map(async (reply: any) => {
              try {
                const decryptedReply = await axios.post(url, {
                  iv: reply.cipherIv,
                  encryptedData: reply.encryptedMessage,
                })
                return {
                  parentMessageId: reply.parentMessageId.toString(),
                  sender: reply.sender,
                  receiver: reply.receiver,
                  decryptedreply: JSON.parse(
                    decryptedReply.data['decryptedData']
                  ),
                  deletedBySender: reply.deletedBySender,
                  deletedByReceiver: reply.deletedByReceiver,
                  movedToTrashBySender: reply.movedToTrashBySender,
                  movedToTrashByReceiver: reply.movedToTrashByReceiver,
                  isReadByReceiver: reply.isReadByReceiver,
                  timestamp: reply.timestamp.toString(),
                }
              } catch (error) {
                console.log(error)
                throw error
              }
            })
            const decryptedMessage = {
              messageId: message.messageId.toString(),
              sender: message.sender,
              receiver: message.receiver,
              message: JSON.parse(decryptData.data['decryptedData']),
              replies: Replies,
              deletedBySender: message.deletedBySender,
              deletedByReceiver: message.deletedByReceiver,
              movedToTrashBySender: message.movedToTrashBySender,
              movedToTrashByReceiver: message.movedToTrashByReceiver,
              isReadByReceiver: message.isReadByReceiver,
              timestamp: message.timestamp.toString(),
            }
            return decryptedMessage
          } else {
            const decryptedMessage = {
              messageId: message.messageId.toString(),
              sender: message.sender,
              receiver: message.receiver,
              message: JSON.parse(decryptData.data['decryptedData']),
              replies: [],
              deletedBySender: message.deletedBySender,
              deletedByReceiver: message.deletedByReceiver,
              movedToTrashBySender: message.movedToTrashBySender,
              movedToTrashByReceiver: message.movedToTrashByReceiver,
              isReadByReceiver: message.isReadByReceiver,
              timestamp: message.timestamp.toString(),
            }
            return decryptedMessage
          }
        } catch (error) {
          console.log(error)
          throw error
        }
      })
      return await Promise.all(MessagesSentBy)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  return transactionResponse
}
