const memcached = require('./connection')

module.exports = async key => {

    if (!key) return { error: 'No especificaste la clave.' }

    return new Promise((resolve, reject) => {

        memcached.get(key, (err, data) => {

            if (err) reject(err)
            else resolve(data)
        
        })

    })

}