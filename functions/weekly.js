const constants = require('./constants')
const getTimeAndDate = require('./get-time-and-date')
const tweet = require('./tweet')

module.exports = async (req, res) => {
  const { WEEKLY } = constants

  console.log('====================================')
  console.log(`Weekly tweet 🏅 - ${getTimeAndDate()}`)
  console.log('====================================')

  try {
    const result = await tweet(WEEKLY)

    return res.send(result)
  } catch (error) {
    return error
  }
}
