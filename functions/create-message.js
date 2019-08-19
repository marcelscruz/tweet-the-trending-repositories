import constants from './constants'

const { DAILY, WEEKLY, MONTHLY } = constants

// Shorten description and add '...'
const shortenDescription = (winner, period) => {
  const { description } = winner

  const slicedDescription = `${description
    .slice(0, description.length - 4)
    .trim()}...`

  const newWinner = {
    ...winner,
    description: slicedDescription,
  }

  return createMessage(newWinner, period)
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

  const starsCount = starsToday || starsThisWeek || starsThisMonth

  let periodAndEmoji
  let labelAndStarsCount

  switch (period) {
    case DAILY:
      periodAndEmoji = 'day 📈'
      labelAndStarsCount = `last 24h: ${starsCount}`
      break
    case WEEKLY:
      periodAndEmoji = 'week 🏅'
      labelAndStarsCount = `last week: ${starsCount}`
      break
    case MONTHLY:
      periodAndEmoji = 'month 🏆'
      labelAndStarsCount = `last month: ${starsCount}`
      break
    default:
      break
  }

  const message = `Trending repository of the ${periodAndEmoji}\n\n${name}\n\n${
    description ? description + '\n\n' : ''
  }⭐️ ${labelAndStarsCount}\n⭐️ total: ${stars}\n${href}`

  const isMessageTooLong = message.length > 275

  if (isMessageTooLong) {
    return shortenDescription(winner, period)
  }

  return message
}

export default createMessage
