const constants = require('./constants')
const checkAuthorTwitterHandle = require('./check-author-twitter-handle')
const twttr = require('twitter-text')

const { DAILY, WEEKLY, MONTHLY } = constants

// Shorten description and add '...'
// const shortenDescription = (winner, period) => {
//   const { description } = winner

//   const slicedDescription = `${description
//     .slice(0, description.length - 4)
//     .trim()}...`

//   const newWinner = {
//     ...winner,
//     description: slicedDescription,
//   }

//   return createMessage(newWinner, period)
// }

// Create message and make sure it's not above 275 characters long
const createMessage = async (winner, period) => {
  const {
    description,
    href,
    author,
    name,
    stars,
    language,
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
      labelAndStarsCount = `Last 24h: ${starsCount}`
      break
    case WEEKLY:
      periodAndEmoji = 'week 🏅'
      labelAndStarsCount = `Last week: ${starsCount}`
      break
    case MONTHLY:
      periodAndEmoji = 'month 🏆'
      labelAndStarsCount = `Last month: ${starsCount}`
      break
    default:
      break
  }

  let nameParsed = name

  if (authorTwitterHandle) {
    nameParsed = `${name} by @${authorTwitterHandle}`
  }

  const message = `
Trending repository of the ${periodAndEmoji}
  
${nameParsed}

${description ? description : ''}

${language ? 'Main language: #' + language : ''}

${labelAndStarsCount} ⭐
Total: ${stars} ⭐️
                  
#100DaysOfCode #CodeNewbie  ${href}`

  const tweetParsed = twttr.parseTweet(message)
  const messageLength = tweetParsed.weightedLength

  if (messageLength > 280) {
    const excess = messageLength - 280
    const shortenDescription = description.slice(
      0,
      description.length - (excess + 3),
    )

    const shortenMessage = `
Trending repository of the ${periodAndEmoji}
  
${nameParsed}

${shortenDescription ? shortenDescription + '...' : ''}

${language ? 'Main language: #' + language : ''}

${labelAndStarsCount} ⭐
Total: ${stars} ⭐️
                  
#100DaysOfCode #CodeNewbie  ${href}`

    return shortenMessage
  } else {
    return message
  }
}

module.exports = createMessage
