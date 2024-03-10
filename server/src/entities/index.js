const fs = require('fs')
const path = require('path')

const data = {}

fs.readdirSync(__dirname).filter(e => e !== 'index.js').forEach(e => {
    let db = e.replace('.js', '')

    if (!data[db]) data[db] = {}

    fs.readdirSync(path.join(__dirname, e)).forEach(f => {
        let table = f.replace('.js', '')
        data[db][table] = require(path.join(__dirname, db, table))
    })
})

module.exports = data