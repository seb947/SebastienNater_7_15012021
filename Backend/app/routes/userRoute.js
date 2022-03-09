module.exports = app => {
    const user = require("../controllers/userCtr");
    const pwdValidator = require('../middleware/password-validator');
    const auth = require('../middleware/auth.js');
    var router = require("express").Router();
  
    router.post("/signup", pwdValidator, user.signup);
    router.post("/login", user.login);
    router.post("/:id", auth, user.updatePicture);
    router.put("/update-password", auth, pwdValidator, user.updatePassword);
    router.delete("/delete", auth, user.delete);

    app.use('/api/user', router);
}