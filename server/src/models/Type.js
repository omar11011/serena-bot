const mongoose = require('mongoose')

const effectivenessSchema = new mongoose.Schema({
    _id: false,
    high: [String],
    low: [String],
    immune: [String],
})

module.exports = mongoose.model('Type', new mongoose.Schema(
    {
        id: Number,
        name: {
            type: String,
            required: true,
            unique: true,
        },
        effectiveness: { type: effectivenessSchema, default: {} },
        image: String,
    },
    {
        timestamps: false,
        versionKey: false,
    },
))