const Command = require('../../class/Command')

const { axios } = require('../../services')
const { createEmbed } = require('../../utils')

module.exports = new Command({
    name: "balance",
    alias: ["bal"],
    description: "Revisa tu balance.",
	async execute(message, props) {
        let user = (await axios.create({
            url: 'user',
            props: { discord_id: message.author.id },
        })).data
        let emoji = message.client.emoji

        return createEmbed(message, {
            description: `${emoji("money")} ${user.balance.money}\n:gem: ${user.balance.gems}`
        })
	},
})