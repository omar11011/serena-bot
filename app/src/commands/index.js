const fs = require("fs")
const path = require("path")

module.exports = client => {
    const foldersPath = path.join(__dirname)
    const commandFolders = fs.readdirSync(foldersPath)
    
    for (const folder of commandFolders) {

        const commandsPath = path.join(foldersPath, folder)

        if (fs.statSync(commandsPath).isDirectory()) {

            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file)
                const command = require(filePath)
                
                if ('data' in command && 'execute' in command) client.commands.set(command.data.name, {
                    ...command,
                    data: {
                        ...command.data,
                        category: folder,
                    },
                })
                else console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
            }

        }
        
    }
}