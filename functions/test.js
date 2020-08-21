// Load env variable
// const dotenv = require('dotenv').config()

// Tweet daily
// const daily = require('./daily')
// daily()

// Check message length
const twttr = require('twitter-text')
const testMessage = `Trending repository of the day 📈
  
hello-algorithm

🌍 🌎 东半球最酷的学习项目 | 包括：1、我写的三十万字图解算法题典 2、100 张各语言思维导图 和 1000 本编程电子📚 3、100 篇大厂面经下载 | English version supported !!! 国人项目上榜不易，右上角助力一波 🚀🚀！干就对了，奥利给 ！💪💪💪

Main language: #Java

Last 24h: 955 ⭐
Total: 10810 ⭐
                  
#100DaysOfCode #CodeNewbie`

const tweetParsed = twttr.parseTweet(testMessage)
const messageLength = tweetParsed.weightedLength
console.log('messageLength: ', messageLength)

if (messageLength > 280) {
  const excess = messageLength - 280
  const shortenMessage = testMessage.slice(0, testMessage.length - excess)
  const shortenTweetParsed = twttr.parseTweet(shortenMessage)
  const shortenMessageLength = shortenTweetParsed.weightedLength

  console.log('shortenMessage: ', shortenMessage)
  console.log('shortenMessageLength: ', shortenMessageLength)
}
