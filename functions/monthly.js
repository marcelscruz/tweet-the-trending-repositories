import constants from './constants'
import getTimeAndDate from './get-time-and-date'
import tweet from './tweet'

module.exports = async (req, res) => {
  const { MONTHLY } = constants

  console.log('====================================')
  console.log(`Monthly tweet 🏆 - ${getTimeAndDate()}`)
  console.log('====================================')

  try {
    const result = await tweet(MONTHLY)

    return res.send(result)
  } catch (error) {
    return res.status(400).send(error)
  }
}
