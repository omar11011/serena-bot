const { createEmbed } = require('../../utils')
const { imgURL } = require('../../bots/nekotina/config.json')

const megadb = require('megadb')
const logMsg = require('../colors/logMsg')

module.exports = async ({ message, userId, command, msgs }) => {

    const db = new megadb.crearDB(command, 'gifs')
    const gifs = await db.obtener('data')

    if (!gifs) return createEmbed(message, {
        color: 'red',
        author: null,
        description: '😦 No tengo suficientes gifs para mostrar en este momento.',
    })

    if (!msgs) msgs = {}
    if (!msgs.mention) msgs.mention = []
    if (!msgs.notMention) msgs.notMention = []
    
    let gif = gifs[Math.floor(Math.random() * gifs.length)]
    let msg = msgs[message.author.id !== userId ? 'mention' : 'notMention']

    if (msg.length > 0) msg = msg[Math.floor(Math.random() * msg.length)]
    else msg = '...'
    
    try {
        return createEmbed(message, {
            color: 'random',
            author: null,
            description: msg,
            image: imgURL + gif,
        })
    }
    catch {
        return logMsg(`No pudo enviarse el embed del comando ${command} en el servidor ${message.guild.id}.`)
    }

}