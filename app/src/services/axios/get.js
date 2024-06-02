const axios = require('axios')
const logMsg = require('../colors/logMsg')

module.exports = async ({ url }) => {

    try {
        const { data } = await axios.get(process.env.SITE_URL + 'api/' + url)

        return data
    }
    catch(err) {
        logMsg(`Error en la BBDD: ${err.message}`, 'r')
        
        return { error: true }
    }

}