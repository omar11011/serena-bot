const mongoose = require('mongoose')

const statsSchema = new mongoose.Schema({
    _id: false,
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
})

const balanceSchema = new mongoose.Schema({
    _id: false,
    money: { type: Number, default: 0 },
    gems: { type: Number, default: 0 },
})

const trainerSchema = new mongoose.Schema({
    _id: false,
    region: String,
})

module.exports = mongoose.model('SerenaUser', new mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
            unique: true,
        },
        stats: { type: statsSchema, default: {} },
        balance: { type: balanceSchema, default: {} },
        trainer: { type: trainerSchema, default: {} },
    },
    {
        timestamps: true,
        versionKey: false,
    },
))