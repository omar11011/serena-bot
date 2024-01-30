const loadGifs = require('./loadGifs')
const loadAnime = require('./loadAnime')

module.exports = async () => {

    await loadGifs()
    await loadAnime()

}