const memcached = require('./connection')
const getData = require('./getData')

module.exports = async ({ key, data, time }) => {

    if (!key) return { error: 'No se especificó la clave.' }
    if (!data) return { error: 'No proporcionaste datos.' }
    if (!time) time = 2592000

    return new Promise((resolve, reject) => {
        
        memcached.set(key, data, time, err => {

            if (err) reject(err)
            else {
                getData(key)
                    .then(createdData => resolve(createdData))
                    .catch(reject)
            }

        })
        
    })

}