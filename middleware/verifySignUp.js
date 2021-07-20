import userModel from '../models/userModel.js';

const ROLES = ["user", "admin", "moderator"];

export const checkDuplicateUsernameOrEmail = (req, res, next) => {
    
    // UserName
    userModel.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }

        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }


        // Email
        userModel.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({
                    message: err
                });
                return;
            }

            if (user) {
                res.status(400).send({
                    message: "Failed! Username is already in use!"
                });
                return;
            }

            next();
        })
    })
}

export const checkDuplicateUsernameOrEmail = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist!`
                });
                return;
            }
        }
    }
    next();
}