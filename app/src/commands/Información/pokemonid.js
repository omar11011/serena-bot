const Command = require('../../class/Command')
const createEmbed = require('../../utils/createEmbed')

const { axios } = require('../../services')

const stats = {
    'hp': 'Salud',
    'attack': 'Ataque',
    'defense': 'Defensa',
    'spattack': 'Ataque Esp.',
    'spdefense': 'Defensa Esp.',
    'speed': 'Velocidad',
}

module.exports = new Command({
    name: "pokemonid",
    alias: ["pid"],
    description: "Busca un Pokémon por su ID.",
    args: ['id'],
	async execute(message, props) {
        let id = props.args[0]
        let data = (await axios.get({ url: `capture/${id}` })).data

        console.log(data)
        if (!data) return message.react('🧐')

        let { types, images } = (await axios.get({ url: `pokemon/form/${data.pokemon.name}` })).data

        let description = [
            `**Dueño:** <@${data.user}>`,
            `**IV:** ${data.stats.iv}%`,
            `**Nivel:** ${data.level}`,
            `**Sexo:** ${['male', 'female'].includes(data.gender) ? ':' + data.gender + '_sign:' : '❌'}`,
            `**Precio:** ${data.marketPrice || 'No está a la venta'}`,
        ]

        return createEmbed({
            message,
            data: {
                color: types[0],
                title: (data.shiny ? '⭐ ' : '') + (data.pokemon.alias || data.pokemon.name),
                description: description.join('\n'),
                image: data.shiny ? images.front_shiny : images.front_default,
                fields: Object.keys(stats).map(e => {
                    return { name: stats[e], value: data.stats[e] + '/31', inline: true }
                }),
                footer: `ID Global: ${data.id}`,
            },
        })
	},
})