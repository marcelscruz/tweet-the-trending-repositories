import axios from 'axios'
import cheerio from 'cheerio'
import constants from './constants'

const { DAILY, WEEKLY, MONTHLY } = constants

export default (period = DAILY, language = '') =>
  new Promise((resolve, reject) =>
    axios
      .get(
        `https://github.com/trending/${encodeURIComponent(
          language,
        )}?since=${period}`,
      )
      .then(response => {
        const $ = cheerio.load(response.data)
        const repos = []

        $('article').each((index, repo) => {
          const title = $(repo)
            .find('h1.h3 a')
            .text()
            .trim()
            .replace(/\r?\n|\r/g, '')

          const starLink = `/${title.replace(
            / /g,
            '',
          )}/stargazers.${title.split('/')[1].trim()}`

          const forkLink = `/${title.replace(
            / /g,
            '',
          )}/network/members.${title.split('/')[1].trim()}`

          const currentRepo = {
            author: title.split('/')[0].trim(),
            name: title.split('/')[1].trim(),
            href: `https://github.com/${title.replace(/ /g, '')}`,
            description:
              $(repo)
                .find('p')
                .text()
                .trim() || null,
            language: $(repo)
              .find('[itemprop=programmingLanguage]')
              .text()
              .trim(),
            stars: parseInt(
              $(repo)
                .find(`[href="${starLink}"]`)
                .text()
                .trim()
                .replace(',', '') || '0',
              0,
            ),
            forks: parseInt(
              $(repo)
                .find(`[href="${forkLink}"]`)
                .text()
                .trim()
                .replace(',', '') || '0',
              0,
            ),
          }

          switch (period) {
            case DAILY:
              currentRepo.starsToday = parseInt(
                $(repo)
                  .find('span.float-sm-right:contains("stars today")')
                  .text()
                  .trim()
                  .replace('stars today', '')
                  .replace(',', '') || '0',
                0,
              )
              break
            case WEEKLY:
              currentRepo.starsThisWeek = parseInt(
                $(repo)
                  .find('span.float-sm-right:contains("stars this week")')
                  .text()
                  .trim()
                  .replace('stars this week', '')
                  .replace(',', '') || '0',
                0,
              )
              break
            case MONTHLY:
              currentRepo.starsThisMonth = parseInt(
                $(repo)
                  .find('span.float-sm-right:contains("stars this month")')
                  .text()
                  .trim()
                  .replace('stars this month', '')
                  .replace(',', '') || '0',
                0,
              )
              break

            default:
              break
          }

          repos.push(currentRepo)
        })

        resolve(repos)
      })
      .catch(err => {
        reject(err)
      }),
  )
