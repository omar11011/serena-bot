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
        
        return createEmbed({
            message,
            data: {
                color: user.created ? 'green' : 'red',
                description:    
                    user.created
                    ? `✅ ¡Te has regitrado exitosamente como entrenador pokémon!`
                    : `❌ ¡Ups! Ya te habías registrado anteriormente.`
            }
        })
	},
})