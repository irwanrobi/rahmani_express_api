import mongoose from 'mongoose';

const offerSchema = mongoose.Schema({
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
        // unique: true,
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
        default: new Date(),
    },
})

const OfferMessage = mongoose.model('OfferMessage', offerSchema);

export default OfferMessage;