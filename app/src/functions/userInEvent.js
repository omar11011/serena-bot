const megadb = require('megadb')
const db = new megadb.crearDB('request', 'events')

async function create(user, props) {
    await db.establecer(user, props)
    return props
}

async function get(user) {
    return db.obtener(user) || null
}

async function clear(user) {
    if (!Array.isArray(user)) user = [user]
    user.forEach(async e => {
        await db.eliminar(e)
    })
    return true
}

module.exports = {
    create,
    get,
    clear,
}