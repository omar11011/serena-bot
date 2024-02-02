const { megadb, axios, memcached } = require('../services')

const db = require('megadb')
const spawn = new db.crearDB('spawn', 'server')
const createEmbed = require('./createEmbed')

module.exports = async props => {

    let { message, prefix } = props

    const send = await megadb.countSpawnMessages(message.guild.id)
    if (!send) return

    const channels = await spawn.obtener(message.guild.id) || []

    channels.forEach(async channel => {
        const pokemon = (await axios.get({ url: 'spawn' })).data
        if (!pokemon) return
    
        try {
            // Shiny
            let probShiny = Math.ceil(Math.random() * 100000)
            if (probShiny > 99700) pokemon.shiny = true

            const embed = createEmbed({
                data: {
                    color: pokemon.types[0],
                    description: '¿Quién es ese pokémon?',
                    image: pokemon.images[pokemon.shiny ? 'front_shiny' : 'front_default'],
                    footer: `Captura este Pokémon antes que huya usando el comando ${prefix}catch <name>`,
                },
                obj: true,
            })

            pokemon.pokemon = { name: pokemon.name, specie: pokemon.specie }

            delete pokemon.name
            delete pokemon.specie
            delete pokemon.images

            // Estableciendo las estadísticas
            Object.keys(pokemon.stats).forEach(e => {
                pokemon.stats[e] = Math.ceil(Math.random() * 31)
            })
            
            // Creando en memoria
            await memcached.createData({
                key: `spawn-${message.guild.id}-${channel}`,
                data: pokemon,
                time: 30,
            })
            
            return message.client.channels.cache.get(channel).send({ embeds: [embed] })
        }
        catch {
            await spawn.extract(message.guild.id, channel)
        }
    })

}