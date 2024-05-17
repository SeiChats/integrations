import Cookies from 'js-cookie'
import { supabase } from '../services/supabase'

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
