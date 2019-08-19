import constants from '../functions/constants'
import tweet from '../functions/tweet'

const addSecondDigit = number => {
  const stringifiedNumber = number.toString()

  if (stringifiedNumber.length === 1) {
    const twoDigitsString = `0${stringifiedNumber}`

    return twoDigitsString
  }

  return stringifiedNumber
}

module.exports = async (req, res) => {
  const { DAILY, WEEKLY, MONTHLY } = constants

  const now = new Date()
  const minutes = now.getMinutes()
  const hours = now.getHours()
  const dayOfWeek = now.getDay()
  const dayOfMonth = now.getDate()
  const month = now.getMonth()
  const year = now.getFullYear()

  const is9AM = hours === 9
  const is10AM = hours === 10
  const is11AM = hours === 11
  const isMonday = dayOfWeek === 1
  const isFirstOfTheMonth = dayOfMonth === 1

  const timeAndDate = `${addSecondDigit(hours)}:${addSecondDigit(
    minutes,
  )} - ${addSecondDigit(dayOfMonth)}/${addSecondDigit(month)}/${year}`

  console.log('====================================')
  console.log('Time and date: ', timeAndDate)
  console.log('====================================')

  const log = {
    timeAndDate,
  }

  let result

  try {
    if (is10AM) {
      // Daily winner
      result = await tweet(DAILY)
    } else if (is9AM && isMonday) {
      // Weekly winner
      result = await tweet(WEEKLY)
    } else if (is11AM && isFirstOfTheMonth) {
      // Monthly winner
      result = await tweet(MONTHLY)
    } else {
      result = "It's not the time for tweeting."
    }

    log.result = result
    return res.json(log, 2)
  } catch (error) {
    log.result = error
    return res.json(log, 2)
  }
}
