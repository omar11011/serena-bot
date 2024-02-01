const Command = require('../../class/Command')

const { axios } = require('../../services')
const { createEmbed } = require('../../utils')

module.exports = new Command({
    name: "register",
    description: "Regístrate como entrenador pokémon.",
	async execute(message, props) {
        let user = await axios.create({
            url: 'user',
            props: { discord_id: message.author.id },
        })

        if (user.error) return
        else user = user.data

        const emoji = message.client.emoji
        
        return createEmbed(message, {
            color: user.created ? 'darkGreen' : 'darkRed',
            description:    
                user.created
                ? `${emoji("check")} ¡Te has regitrado exitosamente como entrenador pokémon!`
                : `${emoji("error")} ¡Ups! Ya te habías registrado anteriormente.`
        })
	},
})