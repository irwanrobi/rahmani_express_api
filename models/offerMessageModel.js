const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
    },
    phone: {
        type: String,
        trim: true,
        required: true,
    },
    messageText: {
        type: String,
        trim: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const offerMessageModel = mongoose.model('OfferMessage', offerSchema);

module.exports = offerMessageModel;