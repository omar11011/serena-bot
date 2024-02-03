const { Client, Collection, GatewayIntentBits, Options } = require('discord.js')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    makeCache: Options.cacheWithLimits(Options.DefaultMakeCacheSettings),
})

client.commands = new Collection()

client.emoji = emoji => {
    const emojis = require('../json/emojis.json')

    emoji = emojis[emoji].split(':')
    emoji = emoji[emoji.length - 1].replace('>', '')

    return client.emojis.cache.get(emoji) || ''
}

module.exports = client