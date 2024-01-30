const fs = require('fs')
const path = require('path')

let rootURL = path.join(__dirname, '../content')
let databases = fs.readdirSync(rootURL).filter(e => !e.endsWith('.js'))

function chargeData(db) {

    let data = []

    if (databases.includes(db)) {
        let pathURL = path.join(rootURL, db)
        let content = fs.readdirSync(pathURL)

        content.forEach(archive => {
            let archiveURL = path.join(pathURL, archive)

            if (fs.statSync(archiveURL).isDirectory()) {
                fs.readdirSync(archiveURL).forEach(file => {
                    let fileURL = path.join(archiveURL, file)

                    addData(fileURL, data)
                })
            }
            else addData(archiveURL, data)
        })
    }
    
    return data

}

function addData(url, data) {
    let result = require(url)

    if (!Array.isArray(result)) result = [result]

    data.push(...result.map((e, i) => {
        e.id = data.length + i + 1
        return e
    }))
}

module.exports = chargeData