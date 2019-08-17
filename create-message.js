const constants = require('./constants')

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
createMessage = (winner, period) => {
  const { description, href, name, stars, starsToday } = winner

  let periodAndEmoji

  switch (period) {
    case DAILY:
      periodAndEmoji = 'day 📈'
      break
    case WEEKLY:
      periodAndEmoji = 'week 🏅'
      break
    case MONTHLY:
      periodAndEmoji = 'month 🏆'
      break
    default:
      break
  }

  const message = `Trending repository of the ${periodAndEmoji}\n\n${name}\n\n${
    description ? description + '\n\n' : ''
  }⭐️ today: ${starsToday}\n⭐️ total: ${stars}\n${href}`

  const isMessageTooLong = message.length > 275

  if (isMessageTooLong) {
    return shortenDescription(winner, period)
  }

  return message
}

module.exports = createMessage
