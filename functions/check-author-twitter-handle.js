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

        let twitterUrl
        let twitterHandle

        const userDetails = $('.vcard-details')
        const organizationDetails = $('.TableObject')

        if (userDetails.length !== 0) {
          userDetails.each((index, item) => {
            if (index === 0) {
              const anchors = $(item).find('li a')

              anchors.each((index, anchor) => {
                const href = $(anchor).attr('href')

                if (href.includes('twitter.com')) {
                  twitterUrl = href
                  return
                }
              })
            }
          })
        } else if (organizationDetails.length !== 0) {
          organizationDetails.each((index, item) => {
            if (index === 0) {
              const anchors = $(item).find('li a')

              anchors.each((index, anchor) => {
                const href = $(anchor).attr('href')

                if (href.includes('twitter.com')) {
                  twitterUrl = href
                  return
                }
              })
            }
          })
        }

        if (twitterUrl) {
          twitterHandle = twitterUrl.split('twitter.com/')[1].trim()
        }

        if (twitterHandle) {
          resolve(twitterHandle)
        } else {
          resolve()
        }
      })
      .catch((err) => {
        console.log('Error finding Twitter handle: ', err)
        reject()
      }),
  )
