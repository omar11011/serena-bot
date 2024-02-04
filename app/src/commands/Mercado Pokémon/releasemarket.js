const Command = require('../../class/Command')

const { axios } = require('../../services')
const createEmbed = require('../../utils/createEmbed')

module.exports = new Command({
    name: "releasemarket",
    alias: ["relm"],
    description: "Elimina a uno de tus Pokémon del mercado.",
    cooldown: 4,
    args: ['id'],
	async execute(message, props) {
        let id = props.args[0]
        if (isNaN(id) || parseInt(id) < 1) return message.react('❌')
        
        let data = (await axios.get({ url: `captures/${message.author.id}?skip=${parseInt(id) - 1}` })).data
        if (data.list && data.list.length < 1) return message.react('🧐')

        await axios.update({
            url: 'capture',
            props: {
                id: data.id,
                marketPrice: null,
            },
        })

        return createEmbed({
            message,
            data: {
                color: 'green',
                description: `Has retirado a ${data.shiny ? '⭐ ' : ''}**${data.pokemon.alias || data.pokemon.name}** del mercado 🤗 `,
            },
        })
	},
})