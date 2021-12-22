const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
    bcryptjs.genSalt(10, function(err,salt){
        bcryptjs.hash(req.body.password, salt, function(err, hash){
            const user = {
                email: req.body.email,
                password: hash,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }
            User.create(user).then(result => {
                res.status(201).json({
                    message: "User created successfully",
                });
            }).catch(error => {
                res.status(500).json({
                    message: "Something went wrong",
                });
            });
        });
    });
}