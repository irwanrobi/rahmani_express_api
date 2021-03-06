const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const userModel = require('../models/userModel');

exports.getUsers = async (req, res) => {

    try {
        const users = await userModel.find()
        .select('_id full_name email roles createdAt')
        .populate('roles');

        res.status(200).json({
            success: true, 
            status: 200,
            message: 'Fetching data Users successful', 
            data: users
        });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { full_name, email, roles } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No user with id: ${id}`);
    }

    const updatedUser = { full_name, email, roles };

    await userModel.findByIdAndUpdate(id, updatedUser, { new: true });

    res.status(202).json({
        success: true, 
        status: 202,
        message: 'User has been updated successfully', 
        data: updatedUser
    });
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No user with id: ${id}`);
    } 

    await userModel.findByIdAndRemove(id);

    res.status(202).json({
        success: true, 
        status: 202,
        message: 'User has been deleted successfully', 
    });
}