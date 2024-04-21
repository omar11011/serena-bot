const Command = require('../../class/Command')
const createEmbed = require('../../utils/createEmbed')
const convertTime = require('../../utils/convertTime')

module.exports = new Command({
    name: "help",
    description: "ℹ️ Muestra más información sobre un comando..",
    alias: ["ayuda"],
    onlyInEvent: ['duelo', 'intercambio'],
    useEvenWithoutEvent: true,
	async execute(message, props) {
        let commands = message.client.commands.map(e => e.data)
        
        if (props.args.length > 0) {
            let nameCommand = props.args[0].toLowerCase()
            let command = commands.find(e => e.name === nameCommand || e.alias.includes(nameCommand))

            if (!command) {
                return createEmbed({
                    message,
                    data: {
                        color: "red",
                        description: `🚫 No hay ningún comando con ese nombre/alias.`,
                    }
                })
            }

            return createEmbed({
                message,
                data: {
                    color: "luminousVividPink",
                    title: `Command: ${command.name}`,
                    description: command.description,
                    fields: [
                        { name: "Categoría", value: command.category, inline: true },
                        { name: "Disponible", value: command.enabled ? "Sí" : "No", inline: true },
                        { name: "Cooldown", value: convertTime(command.cooldown), inline: true },
                        { name: "Argumentos", value: command.args.length > 0 ? `[${command.args.join("] [")}]` : "Ninguno", inline: true },
                        { name: "Alias", value: command.alias.length > 0 ? command.alias.join(", ") : "Ninguno", inline: true },
                    ],
                }
            })
        }
        
        let description = "📜 A continuación verás los comandos para cada categoría disponible.\n"

        const groupedData = commands.reduce((result, item) => {
            const ctg = item.category
            if (!result[ctg]) result[ctg] = []
            result[ctg].push(item)
            return result
        }, {})

        delete groupedData.Admin

        Object.keys(groupedData).map(e => description += "\n**" + e + ":** `" + groupedData[e].map(f => f.name).join("`, `") + "`\n")

        return createEmbed({
            message,
            data: {
                title: "Mis comandos",
                description: description,
                footer: `Obtén más información del comando usando ${props.prefix}help <command>`
            }
        })
	},
})