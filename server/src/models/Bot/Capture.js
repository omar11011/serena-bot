const mongoose = require('mongoose')

const statSchema = new mongoose.Schema({
    _id: false,
    name: String,
    points: Number,
    effort_points: Number,
})

const moveSchema = new mongoose.Schema({
    _id: false,
    name: String,
    category: { type: String, default: 'nivel' },
})

const optionsSchema = new mongoose.Schema({
    _id: false,
    isSelected: { type: Boolean, default: false, },
    isFavorite: { type: Boolean, default: false },
    onSale: { type: Boolean, default: false },
    marketPrice: Number,
})

module.exports = mongoose.model('SerenaCapture', new mongoose.Schema(
    {
        id: String,
        owner: { type: String, default: Date.now() },
        name: String,
        alias: String,
        shiny: { type: Boolean, default: false },
        level: { type: Number, default: 1 },
        xp: { type: Number, default: 0 },
        gender: { type: String, default: 'none' },
        stats: { type: [statSchema], default: null },
        movements: { type: [moveSchema], default: null },
        options: { type: optionsSchema, default: {} },
    },
    {
        timestamps: true,
        versionKey: false,
    },
))