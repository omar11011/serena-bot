const fs = require('fs')
const path = require('path')

const services = {}

const servicesPath = fs.readdirSync(__dirname)

servicesPath.forEach(el => {

    const filePath = path.join(__dirname, el)
    
    if (fs.statSync(filePath).isDirectory()) {

        services[el] = {}

        fs.readdirSync(filePath).filter(e => e !== 'index.js').forEach(e => {
            const name = e.split('.')[0]

            services[el][name] = require(path.join(filePath, e))
        })

    }

})

module.exports = services