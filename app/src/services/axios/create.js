const axios = require('axios')
const logMsg = require('../colors/logMsg')

module.exports = async ({ url, props }) => {
    
    try {
        const { data } = await axios.post(process.env.DB_URL + url, {
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