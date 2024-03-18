const Command = require('../../class/Command')

const { axios } = require('../../services')
const createEmbed = require('../../utils/createEmbed')

module.exports = new Command({
    name: "marketlist",
    alias: ["mlist"],
    description: "Muestra todos los pokémon en venta.",
    cooldown: 6,
    args: ['option'],
	async execute(message, props) {
        props.args = props.args.map(e => e.toLowerCase())

        let page = 1
        let option = props.args[0].toLowerCase()
        let emoji = message.client.emoji
        
        if (!['p', 'i'].includes(option)) return message,reply('Opción inválida.')
        else {
            if (option == 'p') option = 'capture'
            else if (option == 'i') option = 'item'
            else if (option == 'c') option = 'card'

            props.args.shift()
        }
        
        props.args.map(e => {
            if (!isNaN(e) && parseInt(e) > 0) page = e
        })

        let url = `serena/${option}?market=yes&limit=3`

        if (option == 'capture') {
            let shiny = props.args.indexOf('shiny')
            
            if (shiny >= 0) {
                url += `&shiny=yes`
                props.args.splice(shiny, 1)
            }
        }

        if (props.args.length > 0) url += `&name=${props.args.join(' ')}`
        
        let { data } = (await axios.get({ url: url + `&page=${page}` })).data

        if (data.length < 1) return message.reply('No se encontraron resultados.')

        message.reply({ embeds: [ await sendEmbed(data, page, props.prefix) ] }).then(msg => {
            const collectorFilter = m => m.author.id === message.author.id
            const collector = message.channel.createMessageCollector({ filter: collectorFilter, time: 15000, max: 5 })

            collector.on('collect', async m => {
                let response = m.content.toLowerCase()

                if (['next', 'back'].includes(response)) {
                    if (response === 'next') page += 1
                    else if (response === 'back' && page > 1) page -= 1

                    let NEWDATA = (await axios.get({ url: url + `&page=${page}` })).data.data
                    
                    if (NEWDATA.length > 0) {
                        m.react(emoji('check'))
                        msg.edit({ embeds: [ await sendEmbed(NEWDATA, page, props.prefix) ] })
                    }
                }
                else m.react('🧐')
            })

            collector.on('end', () => msg.react('⌛'))
        })
	},
})

async function sendEmbed(data, page, prefix) {
    return createEmbed({
        data: {
            color: 'green',
            author: `Mercado Pokémon - Página ${page}`,
            description: 'A continuación podrás observar todo lo que está en venta. Recuerda que puedes obtener más información usando el comando `' + prefix + 'mshow <option> <ID>`, y compar con el comando `' + prefix +'mbuy <option> <ID>`.',
            fields: data.map(e => {
                let iv = e.stats ? (e.stats.map(f => f.points).reduce((a, b) => a + b, 0) * 100 / (31 * e.stats.length)).toFixed(2) : null

                return {
                    name: (e.shiny ? '⭐ ': '') + e.name,
                    value: `Precio: $${e.options.marketPrice}${iv ? '\nIV: ' + iv + '%' : ''}\nID:${e.code}`,
                    inline: true,
                }
            }),
        },
        obj: true,
    })
}