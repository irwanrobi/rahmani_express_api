import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

const roleModel = mongoose.model('Role', roleSchema);

export default roleModel;