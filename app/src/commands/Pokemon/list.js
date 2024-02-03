const Command = require('../../class/Command')
const createEmbed = require('../../utils/createEmbed')

const { axios } = require('../../services')

module.exports = new Command({
    name: "list",
    description: "Muestra todos los pokémon que has capturado.",
	async execute(message, props) {
        let page = 1
        if (props.args.length > 0 && !isNaN(props.args[0]) && parseInt(props.args) > 0) page = props.args[0]
        
        let data = (await axios.get({ url: `capture/${message.author.id}?page=${page}` })).data

        return createEmbed({
            message,
            data: {
                author: `Mi lista Pokémon - Página ${data.page}`,
                color: data.count > 0 ? 'green' : 'red',
                description: data.count > 0 ? `Hola **${message.author.username}**, hasta el momento has atrapado un total de **${data.count}** Pokémon. Te voy a mostrar algunos:` : 'No se encontraron resultados en esta página.',
                footer: `Mostrando ${(data.page - 1) * data.limit + 1}-${data.list.length + (data.page - 1) * data.limit} de ${data.count}. (Página ${data.page} de ${data.maxPage})`,
                fields: data.list.map((e, i) => {
                    return {
                        name: (e.shiny ? '⭐ ' : '') + e.pokemon.name,
                        value: `ID: ${e.id}\nNivel: ${e.level}\nIV: ${e.iv}%`,
                        inline: true,
                    }
                }),
            },
        })
	},
})