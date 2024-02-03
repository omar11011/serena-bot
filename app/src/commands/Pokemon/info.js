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
    name: "info",
    description: "Muestra información de un pokémon que has capturado.",
    cooldown: 4,
	async execute(message, props) {
        let queries = []
        let url = `capture/${message.author.id}?`

        if (props.args.length < 1) queries.push(`select=yes`)
        else {
            let id = props.args.join(' ').toLowerCase()

            if (id === 'latest') queries.push(`sort=desc`)
            else if (!isNaN(id)) queries.push(`skip=${parseInt(id) - 1}`)
        }

        url += queries.join('&')

        let data = (await axios.get({ url })).data
        if (data.list && data.list.length < 1) return message.react('🧐')
        
        let { types, images } = (await axios.get({ url: `pokemon/form/${data.pokemon.name}` })).data

        return createEmbed({
            message,
            data: {
                color: types[0],
                title: (data.shiny ? '⭐ ' : '') + data.pokemon.name,
                description: `Sexo: ${['male', 'female'].includes(data.gender) ? ':' + data.gender + '_sign:' : '❌'}\nNivel: ${data.level}\nExperiencia: ${data.xp}/${data.level * 100}\n\nMovimientos: ${data.movements.length > 0 ? 'a' : 'Tu pokémon aún no ha aprendido ningún movimiento.'}`,
                thumbnail: data.shiny ? images.front_shiny : images.front_default,
                fields: Object.keys(data.stats).map(e => {
                    return { name: stats[e], value: data.stats[e] + '/31', inline: true }
                }),
                footer: `ID Global: ${data._id}`,
            },
        })
	},
})