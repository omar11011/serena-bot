const Command = require('../../class/Command')
const checkWord = require('../../utils/checkWord')
const createEmbed = require('../../utils/createEmbed')

const { axios } = require('../../services')

module.exports = new Command({
    name: "catch",
    description: "Atrapa los Pokémon salvajes que aparecen en los canales de spawn.",
    args: ['name'],
    cooldown: 4,
	async execute(message, props) {
        let response = checkWord(props.args.join(' ').toLowerCase())
        let spawn = (await axios.create({
            url: 'serena/server',
            props: { server: message.guild.id },
        })).data.spawn
        let channel = spawn.find(e => e.channel == message.channel.id)

        if (!channel || !channel.pokemon) return message.react('🧐')
        
        if (checkWord(channel.pokemon.name.toLowerCase()) === response || checkWord(channel.pokemon.specie.toLowerCase()) === response) {
            let level = Math.ceil(Math.random() * 15)

            channel.pokemon.progress = { level }
            channel.pokemon.owner = message.author.id

            createEmbed({
                message,
                data: {
                    color: 'green',
                    description: `✅ ¡Felicidades! Has capturado un ${channel.pokemon.shiny ? '⭐ ' : ''}**${channel.pokemon.name}** nivel **${level}**.`,
                },
            })

            await axios.create({
                url: 'serena/capture',
                props: channel.pokemon,
            })

            spawn.map(e => {
                if (e.channel == message.channel.id) e.pokemon = null
            })

            return await axios.update({
                url: 'serena/server',
                props: {
                    server: message.guild.id,
                    set: { spawn: spawn },
                },
            })
        }
        else return message.react('❌')
	},
})