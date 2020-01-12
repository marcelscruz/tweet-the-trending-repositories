const constants = require('./constants')
const getTimeAndDate = require('./get-time-and-date')
const tweet = require('./tweet')

module.exports = async (req, res) => {
  const { DAILY } = constants

  console.log('====================================')
  console.log(`Daily tweet 📈 - ${getTimeAndDate()}`)
  console.log('====================================')

  try {
    const result = await tweet(DAILY)

    return res.send(result)
  } catch (error) {
    return error
  }
}
