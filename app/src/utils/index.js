const fs = require('fs')
const path = require('path')

const utils = {}

const utilsPath = fs.readdirSync(__dirname)

utilsPath.forEach(el => {
    const filePath = path.join(__dirname, el)
    const name = el.replace('.js', '')

    utils[name] = require(filePath)
})

module.exports = utils