const { response } = require('../../utils')

const fs = require('fs')
const path = require('path')

module.exports = async (req, res) => {
    let imgURL = null
    let ctg = req.params.ctg.trim().toLowerCase()
    
    try {
        let url = `public/gif/${ctg}/`
        let gifPath = fs.readdirSync(path.join(__dirname, '../../../', url)).filter(e => e.includes('.gif'))

        if (gifPath.length > 0) imgURL = url + gifPath[Math.floor(Math.random() * gifPath.length)]
    }
    catch {
        console.log('No se encontró la categoría', ctg)
    }
    finally {
        return response(res, 200, imgURL)
    }
}