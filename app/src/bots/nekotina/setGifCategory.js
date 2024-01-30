const { gifWords } = require('./config.json')

module.exports = text => {

    let category = null
    let categories = Object.keys(gifWords)

    for (let i = 0; i < categories.length; i++) {
        const results = gifWords[categories[i]]

        for (let j = 0; j < results.length; j++) {
            if (text.toLowerCase().includes(results[j].toLowerCase())) {
                category = categories[i]
                break
            }
        }

        if (category) break
    }

    return category

}