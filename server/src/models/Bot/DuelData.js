const mongoose = require('mongoose')

const statSchema = new mongoose.Schema({
    _id: false,
    name: String,
    key: String,
    points: Number,
    power: Number,
    initialPower: Number,
    effort_points: Number,
    nature: Number,
})

const progressSchema = new mongoose.Schema({
    _id: false,
    level: Number,
    xp: Number,
})

const turnSchema = new mongoose.Schema({
    _id: false,
    move: { type: String, default: null },
    damage: { type: Number, default: null },
    lastDamage: { type: Number, default: null },
    precision: { type: Number, default: 100 },
    usedZMove: { type: Boolean, default: false },
    willUseZMove: { type: Boolean, default: false },
    isMega: { type: Boolean, default: false },
    isGiga: { type: Boolean, default: false },
    lastPriority: { type: Number, default: null },
    lastHits: { type: Number, default: null },
    lastTurn: { type: Number, default: null },
    futureState: { type: String, default: null },
    currentState: { type: String, default: null },
    msgs: { type: [String], default: [] },
})

const pokemonSchema = new mongoose.Schema({
    _id: false,
    code: String,
    name: String,
    originalForm: String,
    specie: String,
    shiny: Boolean,
    progress: progressSchema,
    stats: [statSchema],
    movements: [String],
    equippedItem: String,
    image: String,
})

const battleSchema = new mongoose.Schema({
    _id: false,
    user: String,
    rival: String,
    typeOfBattle: { type: String, default: 'friendly' },
    finish: { type: Boolean, default: false },
})

module.exports = mongoose.model('SerenaDuelData', new mongoose.Schema(
    {
        pokemon: pokemonSchema,
        turn: { type: turnSchema, default: {} },
        battle: battleSchema,
    },
    {
        timestamps: true,
        versionKey: false,
    },
))