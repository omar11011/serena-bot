const mongoose = require('mongoose')

const pokemonSchema = new mongoose.Schema({
    _id: false,
    name: String,
    specie: String,
    alias: String,
})

const statSchema = new mongoose.Schema({
    _id: false,
    hp: { type: Number, default: 5 },
    attack: { type: Number, default: 5 },
    defense: { type: Number, default: 5 },
    spattack: { type: Number, default: 5 },
    spdefense: { type: Number, default: 5 },
    speed: { type: Number, default: 5 },
})

const moveSchema = new mongoose.Schema({
    _id: false,
    name: String,
    category: { type: String, default: 'nivel' },
})

module.exports = mongoose.model('Capture', new mongoose.Schema(
    {
        id: String,
        user: String,
        pokemon: { type: pokemonSchema, default: {} },
        shiny: { type: Boolean, default: false },
        level: { type: Number, default: 1 },
        xp: { type: Number, default: 0 },
        gender: { type: String, default: 'none' },
        stats: { type: statSchema, default: {} },
        movements: { type: [moveSchema], default: null },
        favorite: { type: Boolean, default: false },
        select: { type: Boolean, default: false },
        marketPrice: { type: Number, default: null },
    },
    {
        timestamps: true,
        versionKey: false,
    },
))