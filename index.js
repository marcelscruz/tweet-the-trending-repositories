const constants = require('./constants')
const tweet = require('./tweet')

const checkTime = () => {
  const { DAILY, WEEKLY, MONTHLY } = constants

  const now = new Date()
  const hours = now.getHours()
  const dayOfWeek = now.getDay()
  const dayOfMonth = now.getDate()

  const is9AM = hours === 9
  const is10AM = hours === 10
  const is11AM = hours === 11
  const isMonday = dayOfWeek === 1
  const isFirstOfTheMonth = dayOfMonth === 1

  // Daily winner
  is10AM && tweet(DAILY)

  // Weekly winner
  is9AM && isMonday && tweet(WEEKLY)

  // Monthly winner
  is11AM && isFirstOfTheMonth && tweet(MONTHLY)

  console.log('Hour: ', hours)
  console.log('Day of week: ', dayOfWeek)
  console.log('Day of month: ', dayOfMonth)
}

const ONE_HOUR = 3600000

setInterval(() => {
  checkTime()
}, ONE_HOUR)

console.log("I'M ALIVE")
