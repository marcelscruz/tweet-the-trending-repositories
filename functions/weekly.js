import constants from './constants'
import getTimeAndDate from './get-time-and-date'
import tweet from './tweet'

module.exports = async (req, res) => {
  const { WEEKLY } = constants

  console.log('====================================')
  console.log(`Weekly tweet 🏅 - ${getTimeAndDate()}`)
  console.log('====================================')

  try {
    const result = await tweet(WEEKLY)

    return res.send(result)
  } catch (error) {
    return res.status(400).send(error)
  }
}
