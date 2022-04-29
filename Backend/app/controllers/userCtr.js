const db = require("../models");
const User = db.user;
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
                            res.send("user " + data.firstName + " " + data.lastName + " created");
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
        if(user === null || req.body.password === null){
            res.status(401).json({
                message: "Invalid Credentials!",
            })
        }else{
            bcryptjs.compare(req.body.password, user.password, function(err, result){
                if(result){
                    res.status(200).json({
                      email: user.email,
                      userId: user.id,
                      isAdmin: user.isAdmin,
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
        message: "Something went wrong!" + err,
        });
    });
};

//Delete User
exports.delete = (req, res) => {
    const id = req.userId;
  
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

//Modify user Picture
exports.updatePicture = (req, res) => {
  let newPicture =  `images/${req.file.filename}`;
   try{
        User.update({profilePic:newPicture},{where: {id:req.userId}}) ; 
        res.json({message:"picture updated", profilePic:newPicture}); 
      }catch(error){
        res.status(500).json({ message: "an error occured" });
    }
  };

//Modify user Password
exports.updatePassword = (req, res) => { 
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.password;
  const user = User.findByPk(req.userId);
  try{
      let validate = bcryptjs.compare(oldPassword, user.password) ;
      if (validate){
        let hash = bcryptjs.hash(newPassword, 10) ;
        User.update({password: hash}, { where: { id: req.userId } }) ;
        return res.json({message:"Password modified"});
      }
      res.status(400).json({ message: "Invalid password" });
  }catch(error){
    res.status(500).json({ message: "An error occured" });
  };
};
