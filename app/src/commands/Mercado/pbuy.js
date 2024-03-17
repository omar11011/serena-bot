const Command = require('../../class/Command')

const { axios } = require('../../services')
const createEmbed = require('../../utils/createEmbed')

module.exports = new Command({
    name: "pbuy",
    alias: ["buyp"],
    description: "Compra un Pokémon del mercado.",
    cooldown: 6,
    args: ['option', 'id'],
	async execute(message, props) {
        
	},
})