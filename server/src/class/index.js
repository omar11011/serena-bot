const fs = require('fs')
const path = require('path')

const data = {}

fs.readdirSync(__dirname).filter(e => e !== 'index.js').forEach(e => {
    data[e.replace('.js', '')] = require(path.join(__dirname, e))
})

module.exports = data