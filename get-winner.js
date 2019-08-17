const trending = require('trending-github')

module.exports = (period = '') =>
  new Promise(async (resolve, reject) => {
    try {
      const repos = await trending(period)
      let mostStars = 0
      let firstPosition

      repos.forEach(repo => {
        if (repo.starsToday > mostStars) {
          mostStars = repo.starsToday
          firstPosition = repo
        }
      })

      resolve(firstPosition)
    } catch (error) {
      reject(error)
    }
  })
