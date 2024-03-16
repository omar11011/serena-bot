const Command = require('../../class/Command')
const createEmbed = require('../../utils/createEmbed')

const { axios } = require('../../services')

module.exports = new Command({
    name: "moves",
    alias: ["movements"],
    description: "Muestra todos los movimientos de un Pokémon.",
	async execute(message, props) {
        let page = 1
        let moves = {}
        let id, data
        

        if (props.args.length > 0) {
            id =props.args.join(' ').toLowerCase()
            data = (await axios.get({ url: `pokemon/form/${id}` })).data
        }
        else data = (await axios.get({ url: `serena/capture?onwer=${message.author.id}&limit=1&select=yes` })).data

        if (!data) {
            if (id) return message.react('❓')
            else return message.reply('No tienes seleccionado a ningún pokémon.')
        }
        else if (data.data) {
            data = data.data[0]
            data.images = (await axios.get({ url: `pokemon/form/${data.name}` })).data.images

            return createEmbed({
                message,
                data: {
                    color: 'green',
                    author: `Movimientos de ${data.shiny ? '⭐ ' : ''}${data.name}`,
                    description: `Estos son los movimientos que ha aprendido hasta el momento tu ${data.alias || data.name}.\n\n` + data.movements.map((e, i) => `**[${i + 1}] ${e.name}:** Aprendido por ${e.category}`).join('\n'),
                    thumbnail: data.images[data.shiny ? 'front_shiny' : 'front_default'],
                },
            })
        }

        data.movements.map(e => {
            if (!moves[e.category]) moves[e.category] = []

            moves[e.category].push({ name: e.name, level: e.level })
        })
        
        let pages = Object.keys(moves).length

        if (moves) {
            message.reply({ embeds: [ await sendEmbed(data, moves, page) ] }).then(msg => {
                if (pages > 1) {
                    const collectorFilter = m => m.author.id === message.author.id
                    const collector = message.channel.createMessageCollector({ filter: collectorFilter, time: 20000, max: 5 })

                    collector.on('collect', async m => {
                        let response = m.content.toLowerCase()
        
                        if (['next', 'back'].includes(response)) {
                            if (response === 'next' && page < pages) page += 1
                            else if (response === 'back' && page > 1) page -= 1

                            msg.edit({ embeds: [ await sendEmbed(data, moves, page) ] })
                        }
                        else m.react('🧐')
                    })
        
                    collector.on('end', () => msg.react('⌛'))
                }
            })
        }
	},
})

async function sendEmbed(data, moves, page) {
    let ctgs = Object.keys(moves)
    
    return createEmbed({
        data: {
            color: 'green',
            author: `Movimientos por ${ctgs[page - 1]} de ${data.name}`,
            description: (page > 1 ? `Para ver los movimientos por ${ctgs[page - 2]} escribe ` + '`back`.\n' : '') + (ctgs.length > page ? `Para ver los movimientos por ${ctgs[page]} escribe ` + '`next`.\n' : '') + '\n' + moves[ctgs[page - 1]].map(e => e.name + (ctgs[page - 1] == 'nivel' ? ': Nivel ' + e.level : '')).join(ctgs[page - 1] == 'nivel' ? '\n' : ', '),
            thumbnail: data.images.front_default,
            footer: `Página ${page}/${ctgs.length}`,
        },
        obj: true,
    })
}