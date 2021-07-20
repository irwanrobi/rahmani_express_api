import mongoose from 'mongoose';
import { validationResult } from "express-validator";

import articleModel from '../models/articleModel.js';

export const getArticles = async (req, res) => {
    try {
        const articles = await articleModel.find();

        res.status(200).json({
            success: true, 
            status: 200,
            message: 'Fetching data Articles successful', 
            storageUrl: process.env.BASE_URL + 'uploads/',
            data: articles
        });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getArticle = async (req, res) => {
    const { id } = req.params;

    try {
        const articleDetail = await articleModel.findById(id);

        res.status(200).json({
            success: true, 
            status: 200,
            message: 'Fetching Data Article successful', 
            data: articleDetail
        })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createArticle = async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ 
            success: false, 
            status: 422,
            message: 'Please input all required fields',
            errors: errors.array() 
        });
        next();
    }

    const filePath = req.file.path.replace(/\\/g, "/");
    const fileName = req.file.filename;

    const { title, content, summary, author, tags } = req.body;

    const newArticle = new articleModel({ title, content, summary, author, tags, featuredImage: fileName});

    try {
        await newArticle.save();

        res.status(201).json({
            success: true, 
            status: 201,
            message: 'Submit data successful', 
            data: newArticle
        })
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updateArticle = async (req, res) => {
    const { id } = req.params;
    const { title, content, summary, author, tags, featuredImage } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No article with id: ${id}`);
    }

    const updatedArticle = { title, content, summary, author, tags, featuredImage, _id: id };

    await articleModel.findByIdAndUpdate(id, updatedArticle, { new: true });

    res.status(202).json({
        success: true, 
        status: 202,
        message: 'Article has been updated successfully', 
        data: updatedArticle
    });
}

export const deleteArticle = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No article with id: ${id}`);
    } 

    await articleModel.findByIdAndRemove(id);

    res.status(202).json({
        success: true, 
        status: 202,
        message: 'Article has been deleted successfully', 
    });
}