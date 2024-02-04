const Command = require('../../class/Command')
const createEmbed = require('../../utils/createEmbed')

const { axios } = require('../../services')

module.exports = new Command({
    name: "pokemonlist",
    alias: ["plist"],
    description: "Muestra todos los pokémon que has capturado.",
    cooldown: 4,
	async execute(message, props) {
        let page = 1
        let emoji = message.client.emoji
        if (props.args.length > 0 && !isNaN(props.args[0]) && parseInt(props.args) > 0) page = props.args[0]
        
        let data = (await axios.get({ url: `captures/${message.author.id}?page=${page}` })).data
        
        message.reply({ embeds: [ await sendEmbed(data) ] }).then(msg => {
            const collectorFilter = m => m.author.id === message.author.id
            const collector = message.channel.createMessageCollector({ filter: collectorFilter, time: 15000, max: 5 })

            collector.on('collect', async m => {
                let response = m.content.toLowerCase()

                if ((response === 'next' && page < data.maxPage) || (response === 'back' && page > 1)) {
                    m.react(emoji('check'))

                    if (response === 'next') page += 1
                    else page -= 1

                    let newData = (await axios.get({ url: `captures/${message.author.id}?page=${page}` })).data
                    msg.edit({ embeds: [ await sendEmbed(newData) ] })
                }
                else m.react('🧐')
            })

            collector.on('end', () => msg.react('⌛'))
        })
	},
})

async function sendEmbed(data) {
    return createEmbed({
        data: {
            author: `Mi lista Pokémon - Página ${data.page}`,
            color: data.list.length > 0 ? 'green' : 'red',
            description: data.list.length > 0 ? `¡Hola!, hasta el momento has atrapado un total de **${data.count}** Pokémon.\n` + 'Puedes escribir `next` para pasar a la siguiente página y `back` para regresar.' : 'No se encontraron resultados en esta página.',
            footer: data.list.length > 0 ?`Mostrando ${(data.page - 1) * data.limit + 1}-${data.list.length + (data.page - 1) * data.limit} de ${data.count}. (Página ${data.page} de ${data.maxPage})` : '',
            fields: data.list.map((e, i) => {
                return {
                    name: (e.shiny ? '⭐ ' : '') + e.pokemon.name,
                    value: `ID: ${e.id}\nNivel: ${e.level}\nIV: ${e.iv}%`,
                    inline: true,
                }
            }),
        },
        obj: true,
    })
}