const { megadb, axios, memcached } = require('../services')
const createEmbed = require('./createEmbed')

module.exports = async message => {

    const send = await megadb.countSpawnMessages(message.guild.id)
    if (!send) return

    const pokemon = (await axios.get({ url: 'spawn' })).data
    if (!pokemon) return
    console.log(pokemon)
    try {
        const embed = createEmbed({
            message,
            data: {
                color: pokemon.types[0],
                description: '¿Quién es ese pokémon?',
                image: pokemon.images.front_default,
            },
            obj: true,
        })

        return message.channel.send({ embeds: [embed] })
    }
    catch {
        console.log('No pudo enviarse un spawn.')
    }

}