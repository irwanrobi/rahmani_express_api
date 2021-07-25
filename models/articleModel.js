const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    tags: [String],
    featuredImage: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

const articleModel = mongoose.model('Article', articleSchema);

export default articleModel;