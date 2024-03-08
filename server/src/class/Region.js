const { getImgURL } = require('../utils')

module.exports = class Region {

    constructor(props) {

        this.id = props.id
        this.name = props.name
        this.image = getImgURL({ name: props.name, route: 'region'  })

    }

}