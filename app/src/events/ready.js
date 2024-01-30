const { Events } = require('discord.js')
const { figlet } = require('../services')

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		figlet.bigMessage(client.user.username)
	},
};