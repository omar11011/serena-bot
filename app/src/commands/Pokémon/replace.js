const Command = require('../../class/Command')
const checkWord = require('../../utils/checkWord')
const { axios } = require('../../services')

module.exports = new Command({
    name: "replace",
    description: "Has que tu pokémon olvide un movimiento aprendido.",
    args: ['move'],
    cooldown: 4,
	async execute(message, props) {
        let emoji = message.client.emoji
        let move = checkWord(props.args.join(' ').toLowerCase())
        let { data } = (await axios.get({
            url: `serena/capture?owner=${message.author.id}&limit=1&select=yes`,
        })).data

        if (data.length < 1) return message.reply('No tienes seleccionado ningún pokémon.')
        else data = data[0]

        let index = data.movements.map(e => checkWord(e.name.toLowerCase())).indexOf(move)
        if (index < 0)  return message.react('🧐')

        let nameMove = data.movements[index].name
        data.movements.splice(index, 1)

        message.reply(`**${data.alias || data.name}** está a punto de olvidar **${nameMove}**. Responde ` + '`sí` o `yes` para aceptar.').then(msg => {
            const collectorFilter = m => m.author.id === message.author.id
            const collector = message.channel.createMessageCollector({ filter: collectorFilter, time: 5000, max: 1 })

            collector.on('collect', async m => {
                let response = m.content.toLowerCase()

                if (['yes', 'sí', 'si', 'sim'].includes(response)) {
                    m.react(emoji('check'))

                    await axios.update({
                        url: 'serena/capture',
                        props: {
                            _id: data._id,
                            set: { movements: data.movements },
                        },
                    })

                    return m.reply(`**${data.alias || data.name}** ha olvidado el movimiento **${nameMove}**.`)
                }
            })

            collector.on('end', () => msg.react('⌛'))
        })
	},
})