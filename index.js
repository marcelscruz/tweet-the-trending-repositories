const trending = require('trending-github')

trending().then(repos => console.log(repos))

//=> [{
//=>   author: 'asciimoo',
//=>   name: 'wuzz',
//=>   href: 'https://github.com/asciimoo/wuzz',
//=>   description: 'Interactive cli tool for HTTP inspection',
//=>   language: 'Go',
//=>   stars: 966,
//=>   forks: 20,
//=>   starsToday: 153
//=> }, ... ]
