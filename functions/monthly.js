const constants = require('./constants')
const getTimeAndDate = require('./get-time-and-date')
const tweet = require('./tweet')

module.exports = async (req, res) => {
  const { MONTHLY } = constants

  console.log('====================================')
  console.log(`Monthly tweet 🏆 - ${getTimeAndDate()}`)
  console.log('====================================')

  try {
    const result = await tweet(MONTHLY)

    return res.send(result)
  } catch (error) {
    return error
  }
}
