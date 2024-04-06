let url = 'https://raw.githubusercontent.com/omar11011/serena-bot/main/server/public/'

const replaces = [
    [/ /g, "-"],
]
const checkWord = require('./checkWord')

module.exports = ({ name, route, type, extension }) => {

    name = checkWord(name)

    if (!route) route = ''
    if (!type) type = 'img'
    if (!extension) extension = 'png'
    
    replaces.forEach(e => {
        name = name.replace(e[0], e[1])
    })

    return `${url}${type}/${route}/${name}.${extension}`

}