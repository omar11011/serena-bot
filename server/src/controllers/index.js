const fs = require('fs')
const path = require('path')

const controllers = {}

const controllersPath = fs.readdirSync(__dirname)

controllersPath.forEach(el => {
    const filePath = path.join(__dirname, el)

    if (fs.statSync(filePath).isDirectory()) {
        fs.readdirSync(filePath).filter(archive => archive.endsWith('.js')).map(e => {
            const name = e.replace('.js', '')
            controllers[name] = require(path.join(filePath, e))
        })
    }
})

module.exports = controllers