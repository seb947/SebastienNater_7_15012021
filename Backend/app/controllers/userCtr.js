const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Create and Save a new user
exports.signup = (req, res) => {
  
    User.findOne({where:{email:req.body.email}}).then(result => {
        if(result){
            res.status(409).json({
                message: "Email already exists!"
            })
        }else{
            bcryptjs.genSalt(10, function(err, salt){
                bcryptjs.hash(req.body.password, salt, function(err, hash){
                    const user = {
                        email: req.body.email,
                        password: hash,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName
                    };
                    User.create(user)
                        .then(data => {
                            res.send(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the user."
                            });
                        });
                })
            })
        }
    }).catch(error =>{
        res.status(500).send({
            message:
                error.message || "Some error occurred while creating the user."
            });
    });
};

// Login user
exports.login = (req, res) => {
    User.findOne({where:{email:req.body.email}}).then(user => {
        if(user === null){
            res.status(401).json({
                message: "Invalid Credentials!",
            })
        }else{
            bcryptjs.compare(req.body.password, user.password, function(err, result){
                if(result){
                    /*const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, 'secret', function(err, token){
                        res.status(200).json({
                            message: "Authentication successfull!",
                            token: token
                        })
                    })*/
                    res.status(200).json({
                      email: user.email,
                      userId: user.id,
                      token: jwt.sign(
                          { userId: user.id },
                          'secret',
                          { expiresIn: '24h' }
                      )
                    });
                }
            });
        }
    }).catch(err => {
        res.status(500).json({
        message: "Something went wrong!",
        });
    });
};

//Delete User
exports.delete = (req, res) => {
    const id = req.params.id;
  
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "user was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete user with id=${id}. Maybe user was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete user with id=" + id
        });
      });
  };

/*//Modify user informations
exports.update = (req, res) => {
    const id = req.params.id;
  
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating user with id=" + id
        });
      });
  };*/