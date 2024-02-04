const getColor = require("./getColor")

module.exports = props => {

    let { message, data, obj } = props
    if (!obj) obj = false

    let embed = { color: getColor(data.color || 'random').int }

    // Title
    if (data.title) embed.title = String(data.title)

    // URL
    if (data.url) embed.url = String(data.url)

    // Author
    if (data.author) {
        embed.author = {}

        if (typeof data.author === 'string') embed.author.name = String(data.author)
        else if (typeof data.author === 'object') embed.author = data.author

        if (Object.keys(embed.author).length < 1) delete embed.author
    }

    // Description
    if (data.description) embed.description = String(data.description)

    // Thumbnail
    if (data.thumbnail) embed.thumbnail = {
        url: data.thumbnail,
    }

    // Fields
    if (data.fields) embed.fields = data.fields

    // Image
    if (data.image) embed.image = {
        url: data.image,
    }

    // Footer
    if (data.footer) embed.footer = {
        text: data.footer,
    }
    
    if (obj) return embed
    else return message.reply({ embeds: [ embed ] })

}