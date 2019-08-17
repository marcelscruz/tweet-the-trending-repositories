const express = require('express')
const path = require('path')
const checkTime = require('./check-time')

const publicPath = path.join(__dirname, '../public')

const app = express()

app.use(express.static(publicPath))

// const ONE_HOUR = 3600000
const THREE_SECONDS = 3000

app.use('/', (req, res) => {
  checkTime()
  // setInterval(() => {
  // }, THREE_SECONDS)
  // }, ONE_HOUR)

  res.send("I'm alive!")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`)
})
