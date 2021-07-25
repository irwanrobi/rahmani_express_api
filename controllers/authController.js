const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userModel = require('../models/userModel');

export const register = async (req, res, next) => {

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
    
    const { full_name, email, password, roles } = req.body;

    const emailExist = await userModel.findOne({ email });
    if (emailExist) return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ 
        full_name, 
        email, 
        password: hashedPassword, 
        roles 
    });

    try {
        await newUser.save();

        res.status(201).json({
            success: true, 
            status: 201,
            message: 'Submit data successful', 
            data: {
                _id: newUser._id,
                email: newUser.email,
            }
        })
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}


export const login = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ 
            success: false, 
            status: 422,
            message: 'Please input all  required fields',
            errors: errors.array() 
        });
        next();
    }
    
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).populate('roles');;
    if (!user) return res.status(400).json({
        success: false, 
        status: 422,
        message: 'Email account is not registered'
    });
    
    const validPass = await bcrypt.compareSync(password, user.password);
    if (!validPass) return res.status(400).json({
        success: false, 
        status: 422,
        message: 'Invalid password'
    });
    
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: "24h"
    });

    res
    .header('authorization', token)
    .json({
        success: true, 
        status: 200,
        message: "User logged in successfully",
        user: {
            _id: user._id,
            roles: user.roles[0].name,
            full_name: user.full_name,
            email: user.email,
            createdAt: user.createdAt,
        },
        accessToken: token
    })

    // console.log(user.roles)
    // console.log(user.roles[0].name)
}