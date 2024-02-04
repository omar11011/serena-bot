const Command = require('../../class/Command')
const { megadb } = require('../../services')

module.exports = new Command({
    name: "baka",
    cooldown: 3,
    description: "¡BAKA!",
    mention: true,
	async execute(message, props) {
        let user = props.mention
        let msgs = {
            mention: [`**${user.globalName || user.username}**, ¡¡BAKA!!`],
            notMention: [`**${message.author.globalName}**, ¡¡BAKA!!`],
        }

        await megadb.getGif({
            message,
            msgs,
            userId: user.id,
            command: 'baka',
        })
	},
})