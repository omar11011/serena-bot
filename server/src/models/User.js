const mongoose = require('mongoose')

const statsSchema = new mongoose.Schema({
    _id: false,
    level: { type: Number, default: 1 },
    exp: { type: Number, default: 0 },
})

const balanceSchema = new mongoose.Schema({
    _id: false,
    money: { type: Number, default: 0 },
    gems: { type: Number, default: 0 },
})

module.exports = mongoose.model('User', new mongoose.Schema(
    {
        discord_id: {
            type: String,
            required: true,
            unique: true,
        },
        stats: { type: statsSchema, default: {} },
        balance: { type: balanceSchema, default: {} },
    },
    {
        timestamps: true,
        versionKey: false,
    },
))