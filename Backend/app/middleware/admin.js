const db = require("../models");
const User = db.user;

module.exports = (req, res, next) => {
    const userId = req.userId;
    User.findOne({where:{userId:req.body.userId}})
    .then(result =>
        {
            if (result.isAdmin != true) {
            return res.status(401).send({
                message: "Unauthorized!"
              });
            } else {
                next();
            }
        })
  };