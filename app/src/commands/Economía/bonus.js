const Command = require('../../class/Command')

const { axios } = require('../../services')
const createEmbed = require('../../utils/createEmbed')

module.exports = new Command({
    name: "bonus",
    description: "Gana Pokémonedas cada cierto tiempo.",
    cooldown: 300,
	async execute(message, props) {
        let money = 5 + Math.floor(Math.random() * 11)
        let inc = (await axios.update({
            url: 'serena/user',
            props: {
                user: message.author.id,
                inc: {
                    "balance.money": money,
                },
            },
        })).data

        if (!inc) {
            await axios.create({
                url: 'user',
                props: {
                    user: message.author.id,
                    balance: { money },
                }
            })
        }

        return createEmbed({
            message,
            data: {
                color: 'green',
                description: `Has recibido **${money} Pokémonedas** 🤑`,
            },
        })
	},
})