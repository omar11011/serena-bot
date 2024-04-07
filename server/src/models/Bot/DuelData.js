const mongoose = require('mongoose')

const statSchema = new mongoose.Schema({
    _id: false,
    key: String,
    points: Number,
    power: Number,
    initialPower: Number,
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
    lastTurn: { type: Number, default: null },
})

module.exports = mongoose.model('SerenaDuelData', new mongoose.Schema(
    {
        owner: String,
        name: String,
        form: String,
        specie: String,
        shiny: Boolean,
        rival: String,
        progress: progressSchema,
        stats: [statSchema],
        movements: [String],
        item: String,
        image: String,
        turn: { type: turnSchema, default: {} },
    },
    {
        timestamps: true,
        versionKey: false,
    },
))