const megadb = require('megadb')
const db = new megadb.crearDB('count', 'server')

const limit = 3

module.exports = async server => {

    let send = false
    let count = (await db.obtener(server) || 0) + 1

    if (count >= limit) {
        send = true
        await db.eliminar(server)
    }
    else await db.establecer(server, count)

    return send

}