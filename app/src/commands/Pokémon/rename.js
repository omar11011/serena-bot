const Command = require('../../class/Command')
const { axios } = require('../../services')

module.exports = new Command({
    name: "rename",
    description: "Cambia el nombre de tu compañero por un alias.",
	async execute(message, props) {
        let alias = props.args.length > 0 ? props.args.join(" ") : null
        if (alias && alias.length > 15) return message.reply(`El nombre de tu pokémon no puede tener más de 12 caracteres.`)

        let emoji = message.client.emoji
        let { data } = (await axios.get({
            url: `serena/capture?owner=${message.author.id}&limit=1&select=yes`,
        })).data

        if (data.length < 1) return message.reply('No tienes ningún pokémon seleccionado.')
        else data = data[0]

        if (alias && data.name.toLowerCase() === alias.toLowerCase()) alias = null

        message.reply(`¿Estás segur@ de querer nombrar a ${data.shiny ? '⭐ ' : ''}**${data.alias || data.name}** como **${alias ? alias : data.name}**? Responde ` + '`sí` o `yes` para aceptar.').then(msg => {
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
                            set: { alias },
                        },
                    })

                    return m.reply(`Acabas de nombrar a ${data.shiny ? '⭐ ' : ''}**${data.alias || data.name}** como **${alias ? alias : data.name}**.`)
                }
            })

            collector.on('end', () => msg.react('⌛'))
        })
	},
})