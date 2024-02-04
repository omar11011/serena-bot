const Command = require('../../class/Command')

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

        let data = (await axios.get({ url: `capture/${message.author.id}?skip=${parseInt(id) - 1}` })).data
        if (Array.isArray(data) && data.length < 1) return message.react('🧐')

        await axios.update({
            url: 'capture',
            props: {
                _id: data._id,
                favorite: !data.favorite,
            },
        })

        return message.reply(`Acabas de ${!data.favorite ? 'agregar' : 'retirar'} a ${data.shiny ? '⭐ ' : ''}**${data.pokemon.name}** ${!data.favorite ? 'a' : 'de'} tu lista de favoritos.`)
	},
})