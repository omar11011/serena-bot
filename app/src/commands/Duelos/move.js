const Command = require('../../class/Command')

const { axios } = require('../../services')
const createEmbed = require('../../utils/createEmbed')
const getDuelData = require('../../functions/getDuelData')

const megadb = require('megadb')
const db = new megadb.crearDB('request', 'events')

module.exports = new Command({
    name: "move",
    description: "Ejecuta un movimiento durante una batalla Pokémon.",
    cooldown: 5,
	async execute(message, props) {
        let move = props.args.length > 0 && parseInt(props.args[0]) > 0 ? parseInt(props.args[0]) : null
        let willUseZMove = props.args.length > 1 && props.args[1].toLowerCase() === 'z' ? true : false
        let duel = await getDuelData(message.author.id)

        if (!duel) return
        
        if (!duel.me.turn.move) {
            if (!move || move > duel.me.movements.length) return message.react('❓')
            if (willUseZMove && !duel.me.turn.usedZMove) duel.me.turn.willUseZMove = true

            duel.me.turn.lastTurn = Date.now()
            duel.me.turn.move = duel.me.movements[move - 1]
        }
        else {
            let canContinue = Math.floor((Date.now() - duel.me.turn.lastTurn) / 1000) > 8
            if (!canContinue) return

            duel.rival.turn.damage = duel.rival.turn.lastDamage = 0
        }

        let result = (await axios.update({
            url: 'serena/duel',
            props: duel,
        })).data

        if (result.finish) {
            await axios.delete({
                url: 'serena/duel',
                props: { user: message.author.id },
            })
            await db.eliminar(duel.me.owner)
            await db.eliminar(duel.rival.owner)
        }
        
        if (result.msgs.length > 0) {
            return createEmbed({
                message,
                data: {
                    title: `BATALLA POKÉMON`,
                    color: 'green',
                    description: result.msgs.join("\n\n"),
                },
            })
        }
        else {
            return message.react('✅')
        }
	},
})