const Command = require('../../class/Command')
const createEmbed = require("../../utils/createEmbed")
const convertTime = require("../../utils/convertTime")

module.exports = new Command({
    name: "help",
    description: "ℹ️ Shows more information about a command.",
    alias: ["ayuda"],
	async execute(message, props) {
        let commands = message.client.commands.map(e => e.data)
        
        if (props.args.length > 0) {
            let nameCommand = props.args[0].toLowerCase()
            let command = commands.find(e => e.name === nameCommand || e.alias.includes(nameCommand))

            if (!command) {
                return createEmbed(message, {
                    color: "red",
                    description: `🚫 There is no command with that name/alias.`,
                })
            }

            return createEmbed(message, {
                color: "luminousVividPink",
                title: `Command: ${command.name}`,
                description: command.description,
                fields: [
                    { name: "Category", value: command.category, inline: true },
                    { name: "Enabled", value: command.enabled ? "Yes" : "No", inline: true },
                    { name: "Cooldown", value: convertTime(command.cooldown), inline: true },
                    { name: "Arguments", value: command.args.length > 0 ? `[${command.args.join("] [")}]` : "None", inline: true },
                    { name: "Alias", value: command.alias.length > 0 ? command.alias.join(", ") : "None", inline: true },
                ],
            })
        }
        
        let description = "📜 Below you will see the commands for each available category.\n"

        const groupedData = commands.reduce((result, item) => {
            const ctg = item.category
            if (!result[ctg]) result[ctg] = []
            result[ctg].push(item)
            return result
        }, {})

        delete groupedData.Admin

        Object.keys(groupedData).map(e => description += "\n**" + e + ":** `" + groupedData[e].map(f => f.name).join("`, `") + "`\n")

        return createEmbed(message, {
            title: "My commands",
            description: description,
            footer: `See more information about some command using ${props.prefix}help <command>`
        })
	},
})