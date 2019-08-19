const addSecondDigit = number => {
  const stringifiedNumber = number.toString()

  if (stringifiedNumber.length === 1) {
    const twoDigitsString = `0${stringifiedNumber}`

    return twoDigitsString
  }

  return stringifiedNumber
}

export default () => {
  const now = new Date()
  const minutes = now.getMinutes()
  const hours = now.getHours()
  const dayOfMonth = now.getDate()
  const month = now.getMonth()
  const year = now.getFullYear()

  return `${addSecondDigit(hours)}:${addSecondDigit(
    minutes,
  )} - ${addSecondDigit(dayOfMonth)}/${addSecondDigit(month)}/${year}`
}
