const memcached = require('./connection')

module.exports = async key => {

    if (!key) return { error: 'No se especificó la clave.' }

    return new Promise((resolve, reject) => {

        memcached.del(key, err => {

            if (err) reject(err)
            else resolve({ success: true })

        })
        
    })

}