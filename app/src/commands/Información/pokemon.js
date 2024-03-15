const Command = require('../../class/Command')
const createEmbed = require('../../utils/createEmbed')

const { axios } = require('../../services')

module.exports = new Command({
    name: "pokemon",
    description: "Muestra información de un Pokémon en específico.",
    args: ['id'],
	async execute(message, props) {
        let shiny = false
        let id = props.args.join(' ').toLowerCase()

        if (id.includes('shiny')) {
            shiny = true
            id = id.replace('shiny', '').trim()
        }
        
        let data = (await axios.get({ url: `pokemon/form/${id}` })).data
        if (!data) return message.react('❓')
        
        return createEmbed({
            message, 
            data: {
                color: data.types[0],
                title: `${shiny ? '⭐ ' : ''}${data.name}`,
                description: `**Región:** ${data.region}\n**Especie:** ${data.specie}\n**Tipos:** ${data.types.join(' / ')}`,
                image: data.images[!shiny ? 'front_default' : 'front_shiny'],
                fields: data.stats.map(e => {
                    return { name: e.name, value: String(e.points), inline: true }
                }),
                footer: `ID Global: ${data._id}`,
            }
        })
	},
})