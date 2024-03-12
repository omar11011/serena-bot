const { megadb, axios } = require('../services')
const createEmbed = require('./createEmbed')

module.exports = async props => {

    let { message, prefix } = props

    let send = await megadb.countSpawnMessages(message.guild.id)
    if (!send) return

    let channels = (await axios.create({
        url: 'serena/server',
        props: { server: message.guild.id },
    })).data.spawn

    for (let i = 0; i < channels.length; i++) {
        const pokemon = (await axios.get({ url: 'pokemon/spawn' })).data

        if (pokemon) {
            try {
                channels[i].pokemon = pokemon
    
                const embed = createEmbed({
                    data: {
                        color: pokemon.types[0],
                        title: `¡Ha aparecido un Pokémon salvaje!`,
                        description: `Captura este Pokémon antes que huya usando el comando ${prefix}catch <nombre>`,
                        image: pokemon.image,
                    },
                    obj: true,
                })
    
                message.client.channels.cache.get(channels[i].channel).send({ embeds: [embed] })
            }
            catch {
                channels[i].remove = true
            }
        }
    }

    await axios.update({
        url: 'serena/server',
        props: {
            server: message.guild.id,
            set: { spawn: channels.filter(e => !e.remove) },
        },
    })

}