export function convertTimestampToTime(timestamp: number) {
  // Create a new Date object using the timestamp
  const date = new Date(timestamp)

  // Get the hours and minutes from the date object
  let hours = date.getHours()
  let minutes: string | number = date.getMinutes()

  // Determine whether it's AM or PM
  const amOrPm = hours >= 12 ? 'PM' : 'AM'

  // Convert hours to 12-hour format
  hours = hours % 12 || 12

  // Pad the minutes with leading zero if necessary
  minutes = minutes < 10 ? '0' + minutes : `${minutes}`

  // Construct the time string in the format "hh:mmAM/PM"
  const timeString = hours + ':' + minutes + amOrPm

  return timeString
}
