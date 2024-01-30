const data = require("../json/colors.json")

const randomColor = () => {
    let colors = Object.keys(data)
    let index = Math.floor(Math.random() * colors.length)
    
    return colors[index]
}

const getColor = name => {
    let color = data[name]
    if (!color) color = data[randomColor()]

    return {
        hexa: color,
        int: parseInt(color.slice(1), 16),
    }
}

module.exports = getColor