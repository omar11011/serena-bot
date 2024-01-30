const mongoose = require('mongoose')

const statsSchema = new mongoose.Schema({
    _id: false,
    level: { type: Number, default: 1 },
    exp: { type: Number, default: 0 },
})

module.exports = mongoose.model('Server', new mongoose.Schema(
    {
        server_id: {
            type: String,
            required: true,
            unique: true,
        },
        stats: { type: statsSchema, default: {} },
    },
    {
        timestamps: true,
        versionKey: false,
    },
))