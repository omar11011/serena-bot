const admins = require('../json/admins.json')
const getCooldown = require('./getCooldown')
const { PermissionsBitField } = require('discord.js')

module.exports = async (msg, cmd, props) => {

    const isAdmin = admins.includes(msg.author.id)
    const res = { error: false, msg: 'El comando puede ejecutarse sin problemas.' }

    // Admin commands
    if (cmd.category.toLowerCase() === 'admin' && !isAdmin) {
        res.error = true
        res.msg = 'Este comando sólo puede ser utilizado por los administradores del bot.'
    }

    // Disabled commands
    else if (!cmd.enabled && !isAdmin ) {
        res.error = true
        res.msg = 'El uso de este comando no se encuentra habilitado.'
    }

    // User permissions
    else if (cmd.userPermissions.length > 0) {
        const prm = cmd.userPermissions.filter(e => !msg.member.permissions.has(PermissionsBitField.Flags[e]))

        if (prm.length > 0 && !isAdmin) {
            res.error = true
            res.msg = 'No posees los permisos necesarios en el servidor para ejecutar este comando.'
        }
    }

    // Using arguments
    else if (cmd.args.length > props.args.length) {
        res.error = true
        res.msg = "El uso correcto del comando es: `!" + cmd.name + " <" + cmd.args.join("> <") + ">`"
    }

    // Mentions
    else if (cmd.mention === true) {
        props.mention = (msg.mentions.members.first() || msg.guild.members.cache.get(props.args[0]) || msg.member).user
    }

    // Check cooldown
    const cooldown = await getCooldown(cmd, msg.author.id)

    if (cooldown.mustWait) {
        res.error = true
        res.msg = cooldown.msg
    }

    return res

}