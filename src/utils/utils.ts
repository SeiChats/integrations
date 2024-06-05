import bcrypt from 'bcryptjs'

export function convertTimestampToTime(timestamp: number) {
  // Create a new Date object using the timestamp
  const date = new Date(timestamp * 1000)
  const now = new Date()

  // Get the hours and minutes from the date object
  let hours = date.getHours()
  let minutes: string | number = date.getMinutes()

  // Determine whether it's AM or PM
  const amOrPm = hours >= 12 ? 'PM' : 'AM'

  // Convert hours to 12-hour format
  hours = hours % 12 || 12

  // Pad the minutes with leading zero if necessary
  minutes = minutes < 10 ? '0' + minutes : `${minutes}`

  // Calculate the difference in days
  const dateDiff = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  )

  // Construct the time string in the format "hh:mmAM/PM"
  const timeString = hours + ':' + minutes + amOrPm

  // Determine the appropriate return value based on the date difference
  if (dateDiff === 0) {
    return timeString
  } else if (dateDiff === 1) {
    return 'yesterday'
  } else {
    // Format the date as "MM/DD/YY"
    const day = date.getDate()
    const month = date.getMonth() + 1 // Months are zero-indexed
    const year = date.getFullYear().toString().slice(-2) // Get last two digits of the year
    return `${day}/${month}/${year}`
  }
}

export function formatTimestamp(timestamp: number) {
  // Create a new Date object from the timestamp
  const date = new Date(+timestamp * 1000)

  // Get hours and minutes
  let hours = date.getHours()
  const minutes = date.getMinutes()

  // Determine AM/PM
  const ampm = hours >= 12 ? 'PM' : 'AM'

  // Convert hours from 24-hour format to 12-hour format
  hours = hours % 12
  hours = hours ? hours : 12 // The hour '0' should be '12'

  // Pad minutes with leading zero if necessary
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes

  // Format the time part
  const timeStr = `${hours}:${minutesStr}${ampm}`

  // Get the day of the week
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const dayOfWeek = daysOfWeek[date.getDay()]

  // Get the day of the month
  const dayOfMonth = date.getDate()

  // Get the year
  const year = date.getFullYear()

  // Format the date part
  const dateStr = `${dayOfWeek} ${dayOfMonth}, ${year}`

  // Combine time and date parts
  return `${timeStr} | ${dateStr}`
}

// Function to encrypt a password using bcryptjs
export function encryptPassword(password: string): string {
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)
  return hashedPassword
}

// Function to compare a plaintext password with an encrypted password
export function comparePassword(
  plainTextPassword: string,
  hashedPassword: string
): boolean {
  const isMatch = bcrypt.compareSync(plainTextPassword, hashedPassword)
  return isMatch
}

export function getCurrentDateFormatted(): string {
  const now = new Date()
  const day = now.getDate()
  const month = now.toLocaleString('default', { month: 'short' })
  const year = now.getFullYear()

  const formattedDate = `${day}, ${month} ${year}`
  return formattedDate
}

export function getCurrentTime12HrFormat(): string {
  const now = new Date()
  let hours = now.getHours()
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'

  hours = hours % 12
  hours = hours ? hours : 12 // Set 0 to 12 for 12AM

  const formattedTime = `${hours}:${minutes} ${ampm}`
  return formattedTime
}

export function getFileExtension(str: string): string {
  const lastDotIndex = str.lastIndexOf('.')
  if (lastDotIndex === -1) {
    return '' // No dot found, return an empty string
  }
  return str.slice(lastDotIndex + 1)
}

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const encryptString = (str: string): string => {
  const buffer = Buffer.from(str)
  return buffer.toString('base64')
}

export const decryptString = (str: string): string => {
  const buffer = Buffer.from(str, 'base64')
  return buffer.toString()
}

export const generateId = (length: number = 14): string => {
  let result = ''
  const characters = 'ab_cdefghijklmnopq-rstuvwxyz0123456789'
  const charactersLength = characters.length

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

// Convert file size to MB
export const formatFileSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return 'n/a'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${parseFloat((bytes / 1024 ** i).toFixed(2))} ${sizes[i]}`
}

export const addDots = ({ str, len }: { str: string; len: number }): string => {
  if (!str) return ''
  if (str.length > len) {
    return str.substring(0, len) + '...'
  }
  return str
}

export const getLastTwoChars = (str: string) => {
  return str.slice(-2)
}

export function shrinkString({
  address,
  prefixLength = 5,
  afterLength = 4,
  useDot = false,
}: {
  address: string
  prefixLength?: number
  afterLength?: number
  useDot?: boolean
}): string {
  if (address?.length <= 4) {
    return address // Not enough characters to shrink
  }

  const prefix = address.slice(0, prefixLength)
  const suffix = address.slice(-afterLength)

  return useDot ? `${prefix}...${suffix}` : `${prefix}**${suffix}`
}

const letters = '!ABCDEFGHIJKLMNOPQRSTUVWXYZ#'

export const handleMouseEnter = (el: any) => {
  if (!el) return
  el = el.target
  let iteration: number = 0
  const speed: number = el.dataset.value!.length > 7 ? 30 : 60

  let lastTimestamp: number
  let animationFrameId: number | null = null

  const animate = (timestamp: number) => {
    if (!lastTimestamp) {
      lastTimestamp = timestamp
    }

    // deltaTime is the time elapsed since the last animation frame
    // I use am to reduce or increase speed
    const deltaTime = timestamp - lastTimestamp

    if (deltaTime >= speed) {
      el.innerText = el.innerText
        .split('')
        .map((_: string, index: number) => {
          if (index < iteration) {
            return el.dataset.value![index]
          }

          return letters[Math.floor(Math.random() * letters.length)]
        })
        .join('')

      if (iteration >= el.dataset.value!.length) {
        // Stop the animation if completed
        return
      }

      iteration += 1 / 3
      lastTimestamp = timestamp
    }

    animationFrameId = requestAnimationFrame(animate)
  }

  cancelAnimationFrame(animationFrameId!)
  animationFrameId = requestAnimationFrame(animate)
}

export const messageCardTime = (time: number | Date): string => {
  function getSuffix(date: number): string {
    if (date === 1 || date === 21 || date === 31) {
      return 'st'
    } else if (date === 2 || date === 22) {
      return 'nd'
    } else if (date === 3 || date === 23) {
      return 'rd'
    } else {
      return 'th'
    }
  }

  time = new Date((time as number) * 1000)
  let str = ''

  const months: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const chunks: [number, string][] = [
    [31536000000, 'year'],
    [2592000000, 'month'],
    [604800000, 'week'],
    [86400000, 'day'],
    [3600000, 'hour'],
    [60000, 'minute'],
    [1000, 'second'],
  ]

  const today: Date = new Date()
  const since: Date = new Date(today.getTime() - time.getTime())

  if (since.getTime() > 604800000) {
    str = `${months[time.getMonth()]} ${time.getDate()} ${getSuffix(
      time.getDate()
    )}`

    if (since.getTime() > 31536000000) {
      str = `${str}, ${time.getFullYear()}`
    }
    return str
  }

  let ms: number = 0
  let name: string = ''
  let i: number = 0
  const chunksLength: number = chunks.length
  let count: number = 0

  for (i; i < chunksLength; i++) {
    ms = chunks[i][0]
    name = chunks[i][1]
    count = Math.floor(since.getTime() / ms)
    if (count > 0) break
  }

  return `${count} ${name}${count > 1 ? 's' : ''} ago`
}

export function isSameDay(timestamp1: number, timestamp2: number) {
  const date1 = new Date(timestamp1)
  const date2 = new Date(timestamp2)

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export function formatDate(timestamp: number) {
  const date = new Date(timestamp)
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.getFullYear()

  return `${day} ${month} ${year}`
}
