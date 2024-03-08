const fs = require('fs')
const path = require('path')
const models = require('../../models')
const Class = require('../../class/')
const chargeData = require('./chargeData')

module.exports = async () => {
    fs.readdirSync(path.join(__dirname, '../../class'))
        .filter(file => file !== 'index.js')
        .forEach(async file => {
            let table = file.split('.js')[0]
            
            try {
                await models[table].deleteMany()

                let data = chargeData(table)
                let limit = 100
                let times = Math.ceil(data.length / limit)
            
                for (let i = 0; i < times; i++) {
                    let newData = data.slice(i * limit, (i + 1) * limit).map(e => new Class[table](e))
                    await models[table].insertMany(newData)
                }

                console.log(`Se han cargado ${data.length} datos a la tabla ${table}.`)
            }
            catch {
                console.log('Error al insertar datos en la tabla ' + table)
            }
        })
}