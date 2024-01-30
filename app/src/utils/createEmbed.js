const getColor = require("./getColor")

module.exports = function createEmbed(message, props, obj = false) {

    const embed = {
        color: getColor('blue').int,
        author: {
            name: message.author.username,
            icon_url: message.author.displayAvatarURL({ size: 256, dynamic: true }),
        },
    }
    
    // Color
    if (props.color) embed.color = getColor(props.color).int

    // Title
    if (props.title) embed.title = String(props.title)

    // URL
    if (props.url) embed.url = String(props.url)

    // Author
    if (props.author === null) delete embed.author
    if (props.author) {
        embed.author.name = String(props.author)
        delete embed.author.icon_url
    }

    // Description
    if (props.description) embed.description = String(props.description)

    // Thumbnail
    if (props.thumbnail) embed.thumbnail = {
        url: props.thumbnail,
    }

    // Fields
    if (props.fields) embed.fields = props.fields

    // Image
    if (props.image) embed.image = {
        url: props.image,
    }

    // Footer
    if (props.footer) embed.footer = {
        text: props.footer,
    }

    if (obj) return embed
    else return message.reply({ embeds: [ embed ] })

}