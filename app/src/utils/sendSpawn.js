const { megadb, axios, memcached } = require('../services')

const db = require('megadb')
const spawn = new db.crearDB('spawn', 'server')
const createEmbed = require('./createEmbed')

module.exports = async props => {

    let { message, prefix } = props

    const send = await megadb.countSpawnMessages(message.guild.id)
    if (!send) return

    const channels = (await axios.create({
        url: 'server',
        props: { server: message.guild.id },
    })).data.spawn
    
    channels.forEach(async channel => {
        const pokemon = (await axios.get({ url: 'pokemon/spawn' })).data
        console.log(pokemon)
        if (!pokemon) return
    
        try {
            const embed = createEmbed({
                data: {
                    color: pokemon.types[0],
                    title: `¡Ha aparecido un Pokémon salvaje!`,
                    description: `Captura este Pokémon antes que huya usando el comando ${prefix}catch <nombre>`,
                    image: pokemon.images,
                },
                obj: true,
            })
            
            return message.client.channels.cache.get(channel.channel).send({ embeds: [embed] })
        }
        catch {
            await axios.update({
                url: 'server',
                props: {
                    server: message.guild.id,
                    set: {
                        spawn: channels.filter(e => e.channel != channel.channel),
                    },
                },
            })
        }
    })

}