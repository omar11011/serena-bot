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

        let { user, rival } = duel
        
        if (!user.turn.move) {
            if (!move || move > user.pokemon.movements.length) return message.react('❓')
            if (willUseZMove && !user.turn.usedZMove) user.turn.willUseZMove = true

            user.turn.lastTurn = Date.now()
            user.turn.move = user.pokemon.movements[move - 1]
        }
        else {
            let canContinue = Math.floor((Date.now() - user.turn.lastTurn) / 1000) > 8
            if (!canContinue) return

            rival.turn.damage = rival.turn.lastDamage = 0
        }

        let result = (await axios.update({
            url: 'serena/duel',
            props: duel,
        })).data
        console.log(result)
        if (result.finish) {
            await axios.delete({
                url: 'serena/duel',
                props: { ids: [user._id, rival._id] },
            })
            await db.eliminar(user.battle.user)
            await db.eliminar(rival.battle.user)
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