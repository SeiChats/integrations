import Cookies from 'js-cookie'
import { supabase } from '../services/supabase'

import bcrypt from 'bcryptjs'

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
    console.log('INSERT DATA ERROR', error)

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
    console.log('HAS PASSWORD :', !!data.password)

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
  console.log('data:', data)
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
// const { data: data1 } = await supabase
// .from('users')
// .select('*')
// .eq('wallet_address', address)
// console.log(data1)
