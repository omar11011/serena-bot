const Command = require('../../class/Command')
const loadDataDuel = require('../../functions/loadDuelData')
const userInEvent = require('../../functions/userInEvent')

module.exports = new Command({
    name: "duel",
    description: "Reta a otro entrenador a una batalla Pokémon.",
    cooldown: 5,
    mention: true,
	async execute(message, props) {
        let vsBot = false
        let typeOfBattle = 'friendly'
        let existReq = await userInEvent.get(message.author.id)
        
        if (props.mention.bot || props.mention.id === message.author.id) vsBot = true
        if (!vsBot) existReq = existReq || await userInEvent.get(props.mention.id)

        if (props.args.includes('-c')) typeOfBattle = 'competition'
        if (existReq) return message.reply('¡Ups! Parece que uno de ustedes dos se encuentra dentro de otra batalla o un intercambio en este momento.')

        await userInEvent.create(message.author.id, 'duel')

        if (!vsBot) {
            await userInEvent.create(props.mention.id, 'duel')

            message.channel.send(`<@${props.mention.id}>, el entrenador <@${message.author.id}> te ha retado a una batalla. ` + 'Responde `yes` o `sí` para aceptar el desafío.').then(msg => {
                let start = false
                let collectorFilter = m => m.author.id === message.author.id
                let collector = message.channel.createMessageCollector({ filter: collectorFilter, time: 10000, max: 1 })
    
                collector.on('collect', async m => {
                    let response = m.content.toLowerCase()
    
                    if (!['sí', 'si', 'yes', 'sim'].includes(response)) return
    
                    start = await loadDataDuel({
                        trainers: [message.author.id, props.mention.id],
                        typeOfBattle,
                    })
    
                    if (!start) return message.reply(`¡Ups! Parece que uno de ustedes dos no tiene seleccionado ningún pokémon.`)
                    
                    return message.channel.send('PREPARANDO LOS DATOS PARA EL COMBATE')
                })
    
                collector.on('end', () => {
                    setTimeout(async () => {
                        if (!start) {
                            await userInEvent.clear([message.author.id, props.mention.id])
                            msg.react('⌛')
                        }
                    }, 3000)
                })
            })
        }
        else {

        }
	},
})