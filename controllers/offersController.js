const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const offerMessageModel = require('../models/offerMessageModel');

export const getOffers = async (req, res) => {
    try {
        const offerMessages = await offerMessageModel.find();
        res.status(200).json({
            success: true, 
            status: 200,
            message: 'Fetching data Offer Messages successful', 
            data: offerMessages});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getOffer = async (req, res) => {
    const { id } = req.params;

    try {
        const offerDetail = await offerMessageModel.findById(id);

        res.status(200).json({
            success: true, 
            status: 200,
            message: 'Fetching data Offer Message successful', 
            data: offerDetail
        })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createOffer = async (req, res, next) => {

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

    const { firstName, lastName, email, phone, messageText } = req.body;

    const newOfferMessage = new offerMessageModel({ firstName, lastName, email, phone, messageText });
    
    try {
        await newOfferMessage.save();

        res.status(201).json({
            success: true, 
            status: 201,
            message: 'Submit data successful', 
            data: newOfferMessage
        })
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updateOffer = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phone, messageText } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No offer message with id: ${id}`);
    }

    const updatedOffer = { firstName, lastName, email, phone, messageText, _id: id };

    await offerMessageModel.findByIdAndUpdate(id, updatedOffer, { new: true });

    res.status(202).json({
        success: true, 
        status: 202,
        message: 'Offer Message has been updated successfully', 
        data: updatedOffer
    });
}

export const deleteOffer = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No offer message with id: ${id}`);
    } 

    await offerMessageModel.findByIdAndRemove(id);

    res.status(202).json({
        success: true, 
        status: 202,
        message: 'Offer Message has been deleted successfully', 
    });
}