const Command = require('../../class/Command')
const createEmbed = require('../../utils/createEmbed')

const { axios } = require('../../services')

module.exports = new Command({
    name: "register",
    description: "Regístrate como entrenador pokémon.",
	async execute(message, props) {
        let user = await axios.create({
            url: 'serena/user',
            props: { user: message.author.id },
        })
        
        if (user.error) return
        else user = user.data
        
        const emoji = message.client.emoji
        
        return createEmbed({
            message,
            data: {
                color: user.created ? 'green' : 'red',
                description:    
                    user.created
                    ? `${emoji("check")} ¡Te has regitrado exitosamente como entrenador pokémon!`
                    : `${emoji("error")} ¡Ups! Ya te habías registrado anteriormente.`
            }
        })
	},
})