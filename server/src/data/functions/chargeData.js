const fs = require('fs')
const path = require('path')

function chargeData(db, table) {

    let data = []

    try {
        let url = path.join(__dirname, `../content`, db, table)

        fs.readdirSync(url).forEach(archive => {
            let archiveURL = path.join(url, archive)
            
            if (fs.statSync(archiveURL).isDirectory()) {
                fs.readdirSync(archiveURL).forEach(file => {
                    let fileURL = path.join(archiveURL, file)

                    addData(fileURL, data)
                })
            }
            else addData(archiveURL, data)
        })
    }
    catch {
        console.log('No se encontró el directorio.')
    }
    finally {
        return data
    }

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