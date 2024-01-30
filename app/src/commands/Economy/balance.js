const Command = require('../../class/Command')
const createEmbed = require('../../utils/createEmbed')

const { axios } = require('../../services')

module.exports = new Command({
    name: "balance",
    alias: ["bal"],
    cooldown: 10,
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