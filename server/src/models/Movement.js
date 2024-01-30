const mongoose = require('mongoose')

const z_moveSchema = new mongoose.Schema({
    _id: false,
    type: String,
    item: String,
    power: Number,
    pokemon: [String],
})

const statChangesSchema = new mongoose.Schema({
    _id: false,
    stat: String,
    prob: { type: Number, default: 100 },
    points: { type: Number, default: -1 },
    toUser: { type: Boolean, default: false },
})
const stateChangesSchema = new mongoose.Schema({
    _id: false,
    state: String,
    prob: { type: Number, default: 100 },
    toUser: { type: Boolean, default: false },
})

module.exports = mongoose.model('Movement', new mongoose.Schema(
    {
        id: Number,
        name: String,
        keys: [String],
        type: { type: String, default: "normal" },
        class: String,
        power: Number,
        precision: { type: Number, default: 100 },
        priority: { type: Number, default: 0 },
        hits: { type: Number, default: 1 },
        isZMove: { type: Boolean, default: false },
        isGigaMove: { type: Boolean, default: false },
        isDynaMove: { type: Boolean, default: false },
        statChanges: { type: [statChangesSchema], default: null },
        stateChanges: { type: [stateChangesSchema], default: null },
        z_move: { type: [z_moveSchema], default: null },
    },
    {
        timestamps: true,
        versionKey: false,
    },
))