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
        
        return createEmbed(message, {
            color: data.types[0].toLowerCase(),
            author: `${shiny ? '⭐ ' : ''}${data.name}`,
            description: `**Región:** ${data.region}\n**Especie:** ${data.specie}\n**Tipos:** ${data.types.join(' / ')}`,
            image: data.images[!shiny ? 'front_default' : 'front_shiny'],
            fields: [
                { name: 'HP', value: String(data.stats.hp), inline: true },
                { name: 'Ataque', value: String(data.stats.attack), inline: true },
                { name: 'Defensa', value: String(data.stats.defense), inline: true },
                { name: 'Ataque Esp.', value: String(data.stats.spattack), inline: true },
                { name: 'Defensa Esp.', value: String(data.stats.spdefense), inline: true },
                { name: 'Velocidad', value: String(data.stats.speed), inline: true },
            ],
            footer: `ID Global: ${data.id}`,
        })
	},
})