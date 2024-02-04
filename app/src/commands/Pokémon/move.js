const Command = require('../../class/Command')
const createEmbed = require('../../utils/createEmbed')

const { axios } = require('../../services')

const stats = {
    'hp': 'salud',
    'attack': 'ataque',
    'defense': 'defensa',
    'spattack': 'ataque especial',
    'spdefense': 'defensa especial',
    'speed': 'velocidad',
}

module.exports = new Command({
    name: "move",
    alias: ["movement"],
    description: "Muestra la información de un movimiento.",
    args: ['id'],
	async execute(message, props) {
        let id = props.args.join(" ")
        let data = (await axios.get({ url: `move/${id}` })).data

        if (!data) return message.react('❓')

        let description = []

        if (data.isZMove) description.push(`${data.name} es un movimiento z.`)
        if (data.isGigaMove) description.push(`${data.name} es un movimiento gigamax.`)
        if (data.isDynaMove) description.push(`${data.name} es un movimiento dinamax.`)
        if (data.statChanges) {
            data.statChanges.forEach(e => {
                description.push(`El ${e.toUser ? 'usuario' : 'rival'} ${e.points > 0 ? 'aumenta' : 'disminuye'} su ${stats[e.stat]} en ${Math.abs(e.points)} nivel${Math.abs(e.points) > 1 ? 'es' : ''}.`)
            })
        }
        if (data.stateChanges) {
            data.stateChanges.forEach(e => {
                description.push(`El ${e.toUser ? 'usuario' : 'rival'} ${e.prob < 100 ? 'puede quedar' : 'queda'} ${e.state}${e.prob < 100 ? ' con una probabilidad del ' + e.prob + '%' : ''}.`)
            })
        }

        if (data.z_move) {
            data.z_move.forEach(e => {
                description.push(`${!e.pokemon ? 'Al usar' : `Si ${e.pokemon} usa`} ${e.item} su poder aumenta a ${e.power}.`)
            })
        }

        return createEmbed({
            message, 
            data: {
                color: data.type,
                author: data.name,
                description: description.join('\n'),
                fields: [
                    { name: 'Clase', value: data.class ? data.class : 'Ninguno', inline: true },
                    { name: 'Tipo', value: data.type, inline: true },
                    { name: 'Prioridad', value: String(data.priority), inline: true },
                    { name: 'Potencia', value: String(data.power || '-'), inline: true },
                    { name: 'Precisión', value: String(data.precision) + '%', inline: true, },
                    { name: 'Golpes', value: String(data.hits), inline: true },
                ],
                footer: `ID Global: ${data.id}`,
            }
        })
	},
})