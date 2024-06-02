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
                let command = []
                let filePath = path.join(commandsPath, file)

                if (folder === 'Acción') command = require(filePath)()
                else command.push(require(filePath))

                for (let i = 0; i < command.length; i++) {
                
                    if ('data' in command[i] && 'execute' in command[i]) client.commands.set(command[i].data.name, {
                        ...command[i],
                        data: {
                            ...command[i].data,
                            category: command[i].data.category || folder,
                        },
                    })

                }
            }

        }
        
    }
}