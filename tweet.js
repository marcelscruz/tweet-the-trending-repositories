const OAuth = require('oauth')

const application_consumer_key = process.env.APPLICATION_CONSUMER_KEY
const application_secret = process.env.APPLICATION_SECRET
const user_access_token = process.env.USER_ACCESS_TOKEN
const user_secret = process.env.USER_SECRET

const oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  application_consumer_key,
  application_secret,
  '1.0A',
  null,
  'HMAC-SHA1',
)

const status = 'This is our first tweet!'

const postBody = {
  status,
}

oauth.post(
  'https://api.twitter.com/1.1/statuses/update.json',
  user_access_token,
  user_secret,
  postBody,
  '',

  function(err, data) {
    if (err) {
      console.log('Error: ', err)
    } else {
      console.log('Data: ', data)
    }
  },
)
