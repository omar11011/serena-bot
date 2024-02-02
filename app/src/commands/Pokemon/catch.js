const Command = require('../../class/Command')
const checkWord = require('../../utils/checkWord')
const createEmbed = require('../../utils/createEmbed')

const { axios, memcached } = require('../../services')

module.exports = new Command({
    name: "catch",
    description: "Atrapa los Pokémon salvajes que aparecen en los canales de spawn.",
    args: ['name'],
	async execute(message, props) {
        let emoji = message.client.emoji
        let response = checkWord(props.args.join(' ').toLowerCase())
        let pokemon = await memcached.getData(`spawn-${message.guild.id}-${message.channel.id}`)

        if (!pokemon) return message.react('🧐')
        
        if (checkWord(pokemon.pokemon.name.toLowerCase()) === response || checkWord(pokemon.pokemon.specie.toLowerCase()) === response) {
            let level = Math.ceil(Math.random() * 15)

            await memcached.deleteData(`spawn-${message.guild.id}-${message.channel.id}`)
            await axios.create({
                url: `capture`,
                props: {
                    ...pokemon,
                    user: message.author.id,
                    level,
                },
            })

            return createEmbed({
                message,
                data: {
                    color: 'green',
                    description: `${emoji('check')} ¡Felicidades! Has capturado un ${pokemon.shiny ? '⭐ ' : ''}**${pokemon.pokemon.name}** nivel **${level}**.`,
                },
            })
        }
        else return message.react('❌')
	},
})