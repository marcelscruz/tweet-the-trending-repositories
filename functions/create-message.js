import constants from './constants'

const { DAILY, WEEKLY, MONTHLY } = constants

// Shorten description and add '...'
const shortenDescription = (winner, period) => {
  const { description } = winner

  const slicedDescription = `${description
    .slice(0, description.length - 4)
    .trim()}...`

  const shorterWinner = {
    ...winner,
    description: slicedDescription,
  }

  return createMessage(shorterWinner, period)
}

// Create message and make sure it's not above 275 characters long
const createMessage = (winner, period) => {
  const {
    description,
    href,
    name,
    stars,
    starsToday,
    starsThisWeek,
    starsThisMonth,
  } = winner

  const starsPeriodCount = starsToday || starsThisWeek || starsThisMonth

  let periodAndEmoji
  let starsPeriodWithText

  switch (period) {
    case DAILY:
      periodAndEmoji = 'day 📈'
      starsPeriodWithText = `last 24h: ${starsPeriodCount}`
      break
    case WEEKLY:
      periodAndEmoji = 'week 🏅'
      starsPeriodWithText = `last week: ${starsPeriodCount}`
      break
    case MONTHLY:
      periodAndEmoji = 'month 🏆'
      starsPeriodWithText = `last month: ${starsPeriodCount}`
      break
    default:
      break
  }

  const message = `Trending repository of the ${periodAndEmoji}\n\n${name}\n\n${
    description ? description + '\n\n' : ''
  }⭐️ ${starsPeriodWithText}\n⭐️ total: ${stars}\n${href}`

  const isMessageTooLong = message.length > 275

  if (isMessageTooLong) {
    return shortenDescription(winner, period)
  }

  return message
}

export default createMessage
