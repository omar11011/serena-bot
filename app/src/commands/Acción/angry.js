const Command = require('../../class/Command')
const { megadb } = require('../../services')

module.exports = new Command({
    name: "angry",
    cooldown: 3,
    description: "Expresa tu molestia al mundo.",
    mention: true,
	async execute(message, props) {
        let user = props.mention
        let msgs = {
            mention: [
                `¡**${message.author.globalName}** se sintió furioso/a con **${user.globalName || user.username}**!`
            ],
            notMention: [`**${message.author.globalName}** se enfadó.`],
        }

        await megadb.getGif({
            message,
            msgs,
            userId: user.id,
            command: 'angry',
        })
	},
})