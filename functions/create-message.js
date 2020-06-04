const constants = require('./constants')
const checkAuthorTwitterHandle = require('./check-author-twitter-handle')

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
const createMessage = async (winner, period) => {
  const {
    description,
    href,
    author,
    name,
    stars,
    starsToday,
    starsThisWeek,
    starsThisMonth,
  } = winner

  const starsCount = starsToday || starsThisWeek || starsThisMonth

  // Check if any required value is undefined
  if (!href || !author || !name || !stars || !starsCount) {
    throw {
      href,
      author,
      name,
      stars,
      starsCount,
    }
  }
  const authorTwitterHandle = await checkAuthorTwitterHandle(author)

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

  let nameParsed = name

  if (authorTwitterHandle) {
    nameParsed = `${name} by @${authorTwitterHandle}`
  }

  const message = `Trending repository of the ${periodAndEmoji}\n\n${nameParsed}\n\n${
    description ? description + '\n\n' : ''
  }⭐️ ${labelAndStarsCount}\n⭐️ total: ${stars}\n${href}`

  const isMessageTooLong = message.length > 275

  if (isMessageTooLong) {
    return shortenDescription(winner, period)
  }

  return message
}

module.exports = createMessage
