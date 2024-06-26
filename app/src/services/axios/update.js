const axios = require('axios')
const logMsg = require('../colors/logMsg')

module.exports = async ({ url, props }) => {
    
    try {
        const { data } = await axios.put(process.env.SITE_URL + 'api/' + url, {
            apiKey: process.env.DB_API_KEY,
            ...props,
        })
    
        return data
    }
    catch(err) {
        logMsg(`Error en la BBDD: ${err.message}`, 'r')
        
        return { error: true }
    }

}