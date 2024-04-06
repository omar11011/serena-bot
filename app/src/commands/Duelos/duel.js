const Command = require('../../class/Command')
const loadDataDuel = require('../../functions/loadDuelData')

const megadb = require('megadb')
const db = new megadb.crearDB('request', 'events')

module.exports = new Command({
    name: "duel",
    description: "Reta a otro entrenador a una batalla Pokémon.",
    cooldown: 5,
    mention: true,
	async execute(message, props) {
        if (props.mention.bot || props.mention.id === message.author.id) return message.react('❓')

        let existReq = await db.obtener(message.author.id) || await db.obtener(props.mention.id)
        if (existReq) return message.reply('¡Ups! Parece que uno de ustedes dos se encuentra dentro de otra batalla o un intercambio en este momento.')

        await db.establecer(message.author.id, {
            type: 'duel',
            otherUser: props.mention.id,
        })
        await db.establecer(props.mention.id, {
            type: 'duel',
            otherUser: message.author.id,
        })

        message.channel.send(`<@${props.mention.id}>, el entrenador <@${message.author.id}> te ha retado a una batalla. ` + 'Responde `yes` o `sí` para aceptar el desafío.').then(msg => {
            let start = false
            let collectorFilter = m => m.author.id === message.author.id
            let collector = message.channel.createMessageCollector({ filter: collectorFilter, time: 10000, max: 1 })

            collector.on('collect', async m => {
                let response = m.content.toLowerCase()

                if (!['sí', 'si', 'yes', 'sim'].includes(response)) return

                start = await loadDataDuel([message.author.id, props.mention.id])

                if (!start) return message.reply(`¡Ups! Parece que uno de ustedes dos no tiene seleccionado ningún pokémon.`)
                
                return message.channel.send('PREPARANDO LOS DATOS PARA EL COMBATE')
            })

            collector.on('end', () => {
                setTimeout(async () => {
                    if (!start) {
                        await db.eliminar(message.author.id)
                        await db.eliminar(props.mention.id)
                        msg.react('⌛')
                    }
                }, 3000)
            })
        })
	},
})