const Command = require('../../class/Command')
const createEmbed = require('../../utils/createEmbed')

const { axios } = require('../../services')

module.exports = new Command({
    name: "rename",
    description: "Cambia el nombre de tu compañero por un alias.",
    args: ['name'],
	async execute(message, props) {
        let limit = 25
        let name = props.args.join(' ')
        if (name.length > limit) {
            return createEmbed({
                message,
                data: {
                    color: 'red',
                    description: `El alias de tu Pokémon no puede tener más de ${limit} caracteres.`,
                },
            })
        }
        if (name.includes('⭐')) name = name.replace('⭐', '').trim()

        let data = (await axios.get({ url: `capture/${message.author.id}?select=yes` })).data
        if (data.list && data.list.length < 1) return message.react('🧐')
        
        data.pokemon.alias = name

        await axios.update({
            url: 'capture',
            props: {
                id: data.id,
                pokemon: data.pokemon,
            },
        })

        return createEmbed({
            message,
            data: {
                color: 'green',
                description: `Tu compañero ahora ha recibido el alias de ${data.shiny ? '⭐ ' : ''}**${name}**.`,
            },
        })
	},
})