const Command = require('../../class/Command')
const { createEmbed } = require('../../utils')

module.exports = new Command({
    name: "avatar",
    description: "Muestra el perfil de algún usuario.",
    mention : true,
	async execute(message, props) {
        const user = props.mention
        
        return createEmbed(message, {
            color: 'random',
            author: null,
            title: `Avatar de ${user.globalName || user.username}`,
            image: user.displayAvatarURL({ size: 1024, dynamic: true })
        })
	},
})