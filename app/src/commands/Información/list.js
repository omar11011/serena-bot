const Command = require('../../class/Command')
const createEmbed = require('../../utils/createEmbed')

const { axios } = require('../../services')

module.exports = new Command({
    name: "list",
    description: "Muestra todos los pokémon que has capturado.",
    cooldown: 4,
	async execute(message, props) {
        let queries = { owner: message.author.id, page: 1 }
        let emoji = message.client.emoji

        props.args.forEach(e => {
            e = e.toLowerCase()

            if (!isNaN(e) && parseInt(e) > 0) queries.page = e
            else if (e === 'shiny') queries.shiny = 'yes'
            else if (['fav', 'favorite'].includes(e)) queries.favorite = 'yes'
            else if (e === 'market') queries.market = 'yes'
            else {
                if (!queries.name) queries.name = e
                else queries.name += ' ' + e
            }
        })
        
        let DATA = (await axios.get({
            url: `serena/capture?${Object.keys(queries).map(e => e + '=' + queries[e]).join('&')}`,
        })).data
        
        message.reply({ embeds: [ await sendEmbed(DATA) ] }).then(msg => {
            const collectorFilter = m => m.author.id === message.author.id
            const collector = message.channel.createMessageCollector({ filter: collectorFilter, time: 15000, max: 5 })

            collector.on('collect', async m => {
                let response = m.content.toLowerCase()

                if (['next', 'back'].includes(response)) {
                    if (response === 'next') queries.page += 1
                    else if (response === 'back' && queries.page > 1) queries.page -= 1

                    let NEWDATA = (await axios.get({
                        url: `serena/capture?${Object.keys(queries).map(e => e + '=' + queries[e]).join('&')}`,
                    })).data
                    
                    if (NEWDATA.data.length > 0) {
                        m.react(emoji('check'))
                        msg.edit({ embeds: [ await sendEmbed(NEWDATA) ] })
                    }
                }
            })

            collector.on('end', () => msg.react('⌛'))
        })
	},
})

async function sendEmbed({data, opts}) {
    return createEmbed({
        data: {
            author: `Mi lista Pokémon - Página ${opts.page}`,
            color: data.length > 0 ? 'green' : 'red',
            description: data.length > 0 ? `¡Hola!, hasta el momento has atrapado un total de **${opts.capturedPokemon}** Pokémon.\n` + 'Puedes escribir `next` para pasar a la siguiente página y `back` para regresar.' : 'No se encontraron resultados en esta página.',
            fields: data.map((e, i) => {
                let iv = (e.stats.map(f => f.points).reduce((a, b) => a + b, 0) * 100 / (31 * e.stats.length)).toFixed(2)

                return {
                    name: (e.shiny ? '⭐ ' : '') + (e.alias || e.name),
                    value: `ID:${e.position}\nNivel: ${e.progress.level}\nIV: ${iv}%`,
                    inline: true,
                }
            }),
        },
        obj: true,
    })
}