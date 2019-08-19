import OAuth from 'oauth'
import createMessage from './create-message'
import getWinner from './get-winner'

export default period =>
  new Promise(async (resolve, reject) => {
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

      await oauth.post(
        'https://api.twitter.com/1.1/statuses/update.json',
        userAccessToken,
        userSecret,
        postBody,
        '',
        error => {
          if (error) {
            console.log(
              `Error tweeting ${period} trending repository: ${JSON.stringify(
                error,
              )}`,
            )
            reject(
              `Error tweeting ${period} trending repository: ${JSON.stringify(
                error,
              )}`,
            )
          }
          console.log(`Tweeting ${period} trending repository was successful.`)
          resolve(`Tweeting ${period} trending repository was successful.`)
        },
      )
    } catch (error) {
      console.log(
        `Error fetching ${period} trending repository: ${JSON.stringify(
          error,
        )}`,
      )
      reject(
        `Error fetching ${period} trending repository: ${JSON.stringify(
          error,
        )}`,
      )
    }
  })
