const Command = require('../../class/Command')
const createEmbed = require('../../utils/createEmbed')

const { axios } = require('../../services')

module.exports = new Command({
    name: "select",
    description: "Selecciona un Pokémon.",
    args: ['id'],
    cooldown: 4,
	async execute(message, props) {
        let id = props.args[0]
        if (isNaN(id) || parseInt(id) < 1) return message.react('❌')

        let data = (await axios.get({ url: `capture/${message.author.id}?skip=${parseInt(id) - 1}` })).data
        if (Array.isArray(data) && data.length < 1) return message.react('🧐')

        let currentPokemon = (await axios.get({ url: `capture/${message.author.id}?select=yes` })).data

        if (currentPokemon._id && currentPokemon._id === data._id) {
            return createEmbed({
                message,
                data: {
                    color: 'red',
                    description: 'Ya tienes seleccionado este Pokémon.',
                },
            })
        }

        if (currentPokemon._id) {
            await axios.update({
                url: 'capture',
                props: {
                    _id: currentPokemon._id,
                    select: false,
                },
            })
        }

        await axios.update({
            url: 'capture',
            props: {
                _id: data._id,
                select: true,
            },
        })

        return createEmbed({
            message,
            data: {
                color: 'green',
                description: `Acabas de seleccionar a ${data.shiny ? '⭐ ' : ''}**${data.pokemon.alias || data.pokemon.name}** como tu compañero.`,
            },
        })
	},
})