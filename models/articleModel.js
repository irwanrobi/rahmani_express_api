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
        default: Date.now,
    },
})

const articleModel = mongoose.model('Article', articleSchema);

module.exports = articleModel;