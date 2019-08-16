const trending = require('trending-github')

const fetchTrendingRepositories = (period = '') =>
  new Promise(async (resolve, reject) => {
    try {
      const repos = await trending(period)
      const firstPosition = repos[0]

      resolve(firstPosition)
    } catch (e) {
      console.log(e)
      reject(e)
    }
  })

const getWinners = async () => {
  const dailyWinner = await fetchTrendingRepositories()
  console.log(dailyWinner)

  const weeklyWinner = await fetchTrendingRepositories('weekly')
  console.log(weeklyWinner)

  const montlyWinner = await fetchTrendingRepositories('monthly')
  console.log(montlyWinner)
}

getWinners()
