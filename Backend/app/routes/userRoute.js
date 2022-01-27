module.exports = app => {
    const user = require("../controllers/userCtr");
    const pwdValidator = require('../middleware/password-validator');
    var router = require("express").Router();
  
    router.post("/signup", pwdValidator, user.signup);
    router.post("/login", user.login);
    router.put("/:id", user.update);
    router.delete("/:id", user.delete);

    app.use('/api/user', router);
}