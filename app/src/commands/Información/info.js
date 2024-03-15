const Command = require('../../class/Command')
const createEmbed = require('../../utils/createEmbed')

const { axios } = require('../../services')

module.exports = new Command({
    name: "info",
    description: "Muestra información de un pokémon que has capturado.",
    cooldown: 4,
	async execute(message, props) {
        let id = null
        let desc = false

        if (props.args.length > 0) {
            if (isNaN(props.args[0])) desc = true
            else id = parseInt(props.args[0])
        }

        let { data } = (await axios.get({
            url: `serena/capture?owner=${message.author.id}&limit=1${desc ? '&desc=yes' : (id ? '&skip=' + id : '&select=yes')}`,
        })).data
        
        if (data.length < 1) {
            if (desc) message.reply('Aún no has arapado ningún pokémon.')
            else {
                if (id) return message.react('🧐')
                else return message.reply('No tienes seleccionado a ningún pokémon.')
            }
        }
        else data = data[0]
        console.log(data)
        let { types, images } = (await axios.get({
            url: `pokemon/form/${data.name}`
        })).data

        let iv = (data.stats.map(e => e.points).reduce((a, b) => a + b, 0) * 100 / (31 * data.stats.length)).toFixed(2)
        let description = [
            `**IV:** ${iv}%`,
            `**Nivel:** ${data.progress.level}`,
            `**Experiencia:** ${data.progress.xp}/${data.progress.level * 100}`,
            `**Sexo:** ${['male', 'female'].includes(data.gender) ? ':' + data.gender + '_sign:' : '❌'}`,
            `${data.options.onSale ? `**Precio:** ${data.options.marketPrice}` : ''}`,,
            `**Fecha de captura:** ${(new Date(data.createdAt)).toLocaleDateString('es-PE', { timeZone: 'America/Lima' })}`,
            // `**Movimientos:** ${data.movements.length > 0 ? 'a' : 'Tu pokémon aún no ha aprendido ningún movimiento.'}`,
        ]

        return createEmbed({
            message,
            data: {
                color: types[0],
                title: (data.shiny ? '⭐ ' : '') + (data.alias || data.name),
                description: description.filter(e => e).join('\n'),
                image: data.shiny ? images.front_shiny : images.front_default,
                fields: data.stats.map(e => {
                    return { name: e.name, value: e.points + '/31', inline: true }
                }),
                footer: `ID Global: ${data._id}`,
            },
        })
	},
})