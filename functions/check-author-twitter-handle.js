const axios = require('axios')
const cheerio = require('cheerio')

module.exports = (author) =>
  new Promise((resolve, reject) =>
    axios
      .get(`https://github.com/${author}`, {
        headers: {
          Accept: '*/*',
        },
      })
      .then((response) => {
        const $ = cheerio.load(response.data)

        const userDetails = $('.vcard-details')

        let twitterUrl

        userDetails.each((index, item) => {
          if (index === 0) {
            const anchors = $(item).find('li a')

            anchors.each((index, anchor) => {
              const href = $(anchor).attr('href')

              if (href.includes('twitter.com')) {
                twitterUrl = href
              }
            })
          }
        })

        if (twitterUrl) {
          resolve(twitterUrl.split('twitter.com/')[1].trim())
        } else {
          resolve()
        }
      })
      .catch((err) => {
        console.log('Error finding Twitter handle: ', err)
        reject()
      }),
  )
