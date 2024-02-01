const Command = require('../../class/Command')

const { axios } = require('../../services')
const { createEmbed } = require('../../utils')

module.exports = new Command({
    name: "specie",
    description: "Muestra información de un especie Pokémon en específico.",
    args: ['id'],
	async execute(message, props) {
        let id = props.args.join(' ')
        let data = (await axios.get({ url: `pokemon/specie/${id}` })).data

        if (!data) return message.react('❓')
        
        return createEmbed(message, {
            color: data.types ? data.types[0] : 'random',
            author: `${data.name} #${data.pokedex}`,
            description: `**Forma${data.forms.length <= 1 ? '' : 's'}:** ${data.forms.join(', ')}`,
            image: data.image,
            fields: [
                { name: 'Sexo ♂️', value: `${data.gender.male}%`, inline: true },
                { name: 'Sexo ♀️', value: `${data.gender.female}%`, inline: true },
                { name: 'Grupo Huevo', value: data.eggGroup.join(' / '), inline: true },
                { name: 'Mítico', value: data.isMythical ? 'Sí' : 'No', inline: true },
                { name: 'Legendario', value: data.isLegendary ? 'Sí' : 'No', inline: true },
                { name: 'Ultraente', value: data.isUltraBeast ? 'Sí' : 'No', inline: true },
            ],
            footer: `ID Global: ${data.id}`,
        })
	},
})