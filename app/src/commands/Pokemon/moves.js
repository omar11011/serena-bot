const Command = require('../../class/Command')
const createEmbed = require('../../utils/createEmbed')

const { axios } = require('../../services')

module.exports = new Command({
    name: "moves",
    alias: ["movements"],
    description: "Muestra todos los movimientos de un Pokémon.",
	async execute(message, props) {
        let category = 'nivel'
        let categories = ['nivel', 'maquina', 'huevo', 'tutor', 'especial']
        let id = props.args.join(' ').toLowerCase()

        categories.forEach(e => {
            if (id.includes(e)) {
                category = e
                id = id.replace(e, '')
            }
        })
        
        let data = (await axios.get({ url: `pokemon/moves/${id}?category=${category}` })).data

        if (!data) return message.react('❓')
        
        return createEmbed({
            message, 
            data: {
                color: 'random',
                author: `Movimientos de ${data.pokemon}`,
                description: data.movements.length > 0 ? `${data.pokemon} puede aprender los siguientes movimientos por ${category}:\n\n${data.movements.map(e => `${e.name}${category === "nivel" ? ` | Nivel: ${e.level}` : ""}`).join(category === "nivel" ? "\n" : ", ")}` : 'Aún no hay movimientos disponibles para esta categoría.',
                thumbnail: data.image,
                footer: `Uso del comando: ${props.prefix}moves [${categories.join(", ")}]`,
            }
        })
	},
})