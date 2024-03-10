const mongoose = require('mongoose')

const statChanges = new mongoose.Schema({
    _id: false,
    stat: String,
    prob: Number,
    points: Number,
    toUser: Boolean,
})

const stateChanges = new mongoose.Schema({
    _id: false,
    state: String,
    prob: Number,
    toUser: Boolean,
})

const zMove = new mongoose.Schema({
    _id: false,
    type: String,
    item: String,
    power: Number,
    pokemon: String,
})

module.exports = mongoose.model('PokemonMovement', new mongoose.Schema(
    {
        id: Number,
        name: {
            type: String,
            required: true,
            unique: true,
        },
        type: String,
        class: String,
        power: Number,
        precision: Number,
        priority: Number,
        hits: Number,
        isZMove: Boolean,
        isGigaMove: Boolean,
        isDynaMove: Boolean,
        statChanges: [statChanges],
        stateChanges: [stateChanges],
        z_move: [zMove],
    },
    {
        timestamps: false,
        versionKey: false,
    },
))