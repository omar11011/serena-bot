const models = require('../../models')
const chargeData = require('./chargeData')
const Entities = require('../../entities')

module.exports = async () => {
    Object.keys(Entities).forEach(db => {
        Object.keys(Entities[db]).forEach(async table => {
            try {
                await models[db + table].deleteMany()
    
                let data = chargeData(db, table)
                let limit = 100
                let times = Math.ceil(data.length / limit)
                
                for (let i = 0; i < times; i++) {
                    let newData = data.slice(i * limit, (i + 1) * limit).map(e => new Entities[db][table](e))
                    await models[db + table].insertMany(newData)
                }
    
                console.log(`Se han cargado ${data.length} datos a la tabla ${db + table}.`)
            }
            catch {
                console.log('Error al insertar datos en la tabla ' + db + table)
            }
        })
    })
}