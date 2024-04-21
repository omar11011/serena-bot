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

        return createEmbed({
            message,
            data: {
                color: 'green',
                description: `🤑 Actualmente tienes:\n\n💰 ${user.balance.money}\n💎 ${user.balance.gems}`
            },
        })
	},
})