const getRepositories = require('./get-repositories')

module.exports = period =>
  new Promise(async (resolve, reject) => {
    try {
      const repositories = await getRepositories(period)

      let mostStars = 0
      let firstPosition

      repositories.forEach(repository => {
        const starsCount =
          repository.starsToday ||
          repository.starsThisWeek ||
          repository.starsThisMonth

        if (starsCount > mostStars) {
          mostStars = starsCount
          firstPosition = repository
        }
      })

      resolve(firstPosition)
    } catch (error) {
      reject(error)
    }
  })
