const Command = require('../../class/Command')
const createEmbed = require('../../utils/createEmbed')

const { axios } = require('../../services')

module.exports = new Command({
    name: "favorite",
    alias: ['fav', 'favo'],
    description: "Agrega o retira un Pokémon de tu lista de favoritos.",
    args: ['id'],
    cooldown: 4,
	async execute(message, props) {
        let id = props.args[0]
        if (isNaN(id) || parseInt(id) < 1) return message.react('❌')

        let data = (await axios.get({ url: `captures/${message.author.id}?skip=${parseInt(id) - 1}` })).data
        if (data.list && data.list.length < 1) return message.react('🧐')

        await axios.update({
            url: 'capture',
            props: {
                id: data.id,
                favorite: !data.favorite,
            },
        })

        return createEmbed({
            message,
            data: {
                color: 'green',
                description: `Acabas de ${!data.favorite ? 'agregar' : 'retirar'} a ${data.shiny ? '⭐ ' : ''}**${data.pokemon.alias || data.pokemon.name}** ${!data.favorite ? 'a' : 'de'} tu lista de favoritos.`,
            },
        })
	},
})