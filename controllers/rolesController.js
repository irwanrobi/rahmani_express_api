import mongoose from 'mongoose';
import { validationResult } from "express-validator";

import roleModel from '../models/roleModel.js'

export const getRoles = async (req, res) => {
    try {
        const roles = await roleModel.find();

        res.status(200).json({
            success: true, 
            status: 200,
            message: 'Fetching data Roles successful', 
            data: roles
        })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createRole = async (req, res, next) => {
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

    const { name } = req.body;

    const newRole = new roleModel({ name });

    try {
        await newRole.save();

        res.status(201).json({
            success: true, 
            status: 201,
            message: 'Submit data successful', 
            data: newRole
        });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const deleteRole = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No offer message with id: ${id}`);
    } 

    await roleModel.findByIdAndRemove(id);

    res.status(202).json({
        success: true, 
        status: 202,
        message: 'Offer Message has been deleted successfully', 
    });
}