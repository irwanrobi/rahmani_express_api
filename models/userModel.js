import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const userModel = mongoose.model('User', userSchema);

export default userModel;