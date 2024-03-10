const { checkBoolean, getImgURL } = require('../../utils')

module.exports = class PokemonSpecie {

    constructor(props) {

        this.id = props.id
        this.name = props.name
        this.pokedex = props.id
        this.gender = this.checkGender(props.gender)
        this.eggGroup = this.checkEggGroup(props.eggGroup)
        this.isMythical = checkBoolean(props.isMythical, false)
        this.isLegendary = checkBoolean(props.isLegendary, false)
        this.isUltraBeast = checkBoolean(props.isUltraBeast, false)
        this.image = getImgURL({ name: props.name, route: 'pokemon'  })

    }

    checkEggGroup(data) {
        if (!data || !Array.isArray(data)) data = ["Campo"]

        return data
    }

    checkGender(prob) {
        const gender = { male: 50, female: 50 }

        if (prob === null) {
            gender.male = 0
            gender.female = 0
        }
        if (prob) {
            gender.male = prob
            gender.female = 100 - prob
        }

        return gender
    }
    
}