const url = 'https://raw.githubusercontent.com/omar11011/serena-bot/main/server/public/img/'

const replaces = [
    [/ /g, "-"],
]
const checkWord = require('./checkWord')

module.exports = ({ name, route, extension }) => {

    name = checkWord(name)

    if (!route) route = ''
    if (!extension) extension = '.png'
    
    replaces.forEach(e => {
        name = name.replace(e[0], e[1])
    })

    return `${url}${route}/${name}${extension}`

}