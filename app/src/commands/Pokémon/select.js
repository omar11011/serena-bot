const Command = require('../../class/Command')
const { axios } = require('../../services')

module.exports = new Command({
    name: "select",
    description: "Selecciona un Pokémon.",
    args: ['id'],
    cooldown: 4,
	async execute(message, props) {
        let id = isNaN(props.args[0]) ? 1 : props.args[0]
        let { data } = (await axios.get({
            url: `serena/capture?owner=${message.author.id}&limit=1&skip=${id}`,
        })).data
        
        if (data.length < 1) return message.reply(id ? 'El ID ingresado es inválido.' : 'No tienes ningún pokémon seleccionado.')
        else data = data[0]

        if (data.options.isSelected) return message.reply(`Ya tenías seleccionado a ${data.shiny ? '⭐ ' : ''}**${data.alias || data.name}**.`)

        let pokemonSelected = (await axios.get({
            url: `serena/capture?owner=${message.author.id}&limit=1&select=yes`,
        })).data.data
        
        let changes = [data, ...pokemonSelected].forEach(async e => {
            await axios.update({
                url: 'serena/capture',
                props: {
                    _id: e._id,
                    set: { 'options.isSelected': !e.options.isSelected },
                },
            })
        })
    
        return message.reply(`Acabas de seleccionar a ${data.shiny ? '⭐ ' : ''}**${data.alias || data.name}**.`)
	},
})