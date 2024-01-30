const fs = require('fs')
const path = require('path')

const bots = {}

const botsPath = fs.readdirSync(__dirname)

botsPath.forEach(el => {

    const filePath = path.join(__dirname, el)
    
    if (fs.statSync(filePath).isDirectory()) {

        bots[el] = {}

        fs.readdirSync(filePath).filter(e => e !== 'index.js').forEach(e => {
            const name = e.split('.')[0]

            bots[el][name] = require(path.join(filePath, e))
        })

    }

})

module.exports = bots