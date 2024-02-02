const megadb = require('megadb')
const db = new megadb.crearDB('prefix', 'server')

module.exports = async server => {

    let prefix = await db.obtener(server) || process.env.BOT_PREFIX

    return prefix

}