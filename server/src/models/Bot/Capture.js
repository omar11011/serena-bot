const mongoose = require('mongoose')

const statSchema = new mongoose.Schema({
    _id: false,
    name: String,
    key: String,
    points: { type: Number, default: 5 },
    effort_points: { type: Number, default: 0 },
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
    marketPrice: { type: Number, default: null },
})

const progressSchema = new mongoose.Schema({
    _id: false,
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
})

module.exports = mongoose.model('SerenaCapture', new mongoose.Schema(
    {
        id: String,
        owner: String,
        name: {
            type: String,
            required: true,
        },
        alias: { type: String, defaul: null },
        shiny: { type: Boolean, default: false },
        progress: { type: progressSchema, default: {} },
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