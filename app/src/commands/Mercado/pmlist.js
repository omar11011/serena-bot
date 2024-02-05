const Command = require('../../class/Command')
const createEmbed = require('../../utils/createEmbed')

const { axios } = require('../../services')

module.exports = new Command({
    name: "pmlist",
    description: "Muestra todos los Pokémon que están a la venta.",
    cooldown: 4,
	async execute(message, props) {
        let obj = {}
        let page = 1
        let name = props.args.length > 0 ? props.args.join(" ").toLowerCase() : null

        if (name) {
            if (!isNaN(props.args[0]) && parseInt(props.args[0]) > 0) {
                page = props.args[0]
                name = name.replace(page, '')
            }

            if(name.includes('shiny')) {
                obj.shiny = true
                name = name.replace('shiny', '')
            }

            let opts1 = ['mythical', 'legendary', 'ub']
            opts1.forEach(e => {
                if (name.includes(e)) {
                    obj.category = e
                    name = name.replace(e, '')
                }
            })

            name = name.trim()

            if (name.length > 0) obj.name = name
        }
        
        let data = await getData(page, obj)
        
        message.reply({ embeds: [ await sendEmbed(data, props.prefix) ] }).then(msg => {
            const collectorFilter = m => m.author.id === message.author.id
            const collector = message.channel.createMessageCollector({ filter: collectorFilter, time: 15000, max: 5 })

            collector.on('collect', async m => {
                let response = m.content.toLowerCase()

                if ((response === 'next' && page < data.maxPage) || (response === 'back' && page > 1)) {
                    m.react(emoji('check'))

                    if (response === 'next') page += 1
                    else page -= 1

                    data = await getData(page, obj)
                    msg.edit({ embeds: [ await sendEmbed(data, props.prefix) ] })
                }
                else m.react('🧐')
            })

            collector.on('end', () => msg.react('⌛'))
        })
	},
})

async function getData(page, obj) {
    let data = (await axios.create({
        url: 'capture/find',
        props: {
            market: true,
            page,
            ...obj,
        },
    })).data

    return data
}

async function sendEmbed(data, prefix) {
    return createEmbed({
        data: {
            author: `Pokémon en venta - Página ${data.page}`,
            color: data.list.length > 0 ? 'green' : 'red',
            description: data.list.length > 0 ? '¡Hola!, te mostraré aquellos Pokémon que están en venta.\nPuedes comprar un Pokémon usando el comando `' + prefix + 'pbuy <id>`' : 'No hay Pokémon en venta en este momento.',
            footer: data.list.length > 0 ?`Mostrando ${(data.page - 1) * data.limit + 1}-${data.list.length + (data.page - 1) * data.limit} de ${data.count}. (Página ${data.page} de ${data.maxPage})` : '',
            fields: data.list.map((e, i) => {
                return {
                    name: (e.shiny ? '⭐ ' : '') + e.pokemon.name,
                    value: `ID: ${e.id}\nPrecio: ${e.marketPrice}\nIV: ${e.iv}%`,
                    inline: true,
                }
            }),
        },
        obj: true,
    })
}