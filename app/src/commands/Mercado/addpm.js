const Command = require('../../class/Command')

const { axios } = require('../../services')
const createEmbed = require('../../utils/createEmbed')

module.exports = new Command({
    name: "addpm",
    description: "Agrega uno de tus Pokémon al mercado.",
    cooldown: 4,
    args: ['id', 'precio'],
	async execute(message, props) {
        let id = props.args[0]
        let price = props.args[1]

        if (isNaN(id) || parseInt(id) < 1 || isNaN(price) || parseInt(price) < 1) {
            return createEmbed({
                message,
                data: { color: 'red', description: 'El ID o precio que has ingresado no es válido.' },
            })
        }
        
        let data = (await axios.get({ url: `captures/${message.author.id}?skip=${parseInt(id) - 1}` })).data
        if (data.list && data.list.length < 1) return message.react('🧐')

        await axios.update({
            url: 'capture',
            props: {
                id: data.id,
                marketPrice: parseInt(price),
            },
        })

        return createEmbed({
            message,
            data: {
                color: 'green',
                description: `Has añadido a ${data.shiny ? '⭐ ' : ''}**${data.pokemon.alias || data.pokemon.name}** al mercado por un precio de **${price}** Pokémonedas 🤑`,
            },
        })
	},
})