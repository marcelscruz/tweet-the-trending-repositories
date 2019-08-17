const express = require('express')
const checkTime = require('./check-time')

const app = express()

// const ONE_HOUR = 3600000
const THREE_SECONDS = 3000

app.use('/', () => {
  setInterval(() => {
    checkTime()
  }, THREE_SECONDS)
  // }, ONE_HOUR)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`)
})
