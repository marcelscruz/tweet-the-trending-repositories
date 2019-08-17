const OAuth = require('oauth')
const createMessage = require('./create-message')
const getWinner = require('./get-winner')

module.exports = async period => {
  const applicationConsumerKey = process.env.APPLICATION_CONSUMER_KEY
  const applicationSecret = process.env.APPLICATION_SECRET
  const userAccessToken = process.env.USER_ACCESS_TOKEN
  const userSecret = process.env.USER_SECRET

  try {
    const winner = await getWinner(period)
    const message = createMessage(winner, period)

    const oauth = new OAuth.OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      applicationConsumerKey,
      applicationSecret,
      '1.0A',
      null,
      'HMAC-SHA1',
    )

    const postBody = {
      status: message,
    }

    oauth.post(
      'https://api.twitter.com/1.1/statuses/update.json',
      userAccessToken,
      userSecret,
      postBody,
      '',
      error => {
        if (error) {
          console.log('Error tweeting: ', error)
        }
      },
    )
  } catch (error) {
    console.log(`Error fetching ${period} trending repository: ${error}`)
  }
}
