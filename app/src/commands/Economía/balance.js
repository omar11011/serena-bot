const Command = require('../../class/Command')

const { axios } = require('../../services')
const createEmbed = require('../../utils/createEmbed')

module.exports = new Command({
    name: "balance",
    alias: ["bal"],
    description: "Revisa tu balance.",
	async execute(message, props) {
        let user = (await axios.create({
            url: 'serena/user',
            props: { user: message.author.id },
        })).data
        let emoji = message.client.emoji

        return createEmbed({
            message,
            data: {
                color: 'green',
                description: `🤑 Actualmente tienes:\n\n${emoji("money")} ${user.balance.money}\n:gem: ${user.balance.gems}`
            },
        })
	},
})