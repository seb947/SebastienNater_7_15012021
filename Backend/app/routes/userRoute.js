module.exports = app => {
    const user = require("../controllers/userCtr");
    const pwdValidator = require('../middleware/password-validator');
    const auth = require('../middleware/auth.js');
    const admin = require('../middleware/admin.js');
    var router = require("express").Router();
  
    router.post("/signup", pwdValidator, user.signup);
    router.post("/login", user.login);
    router.post("/picture", auth, user.updatePicture);
    router.put("/password", auth, pwdValidator, user.updatePassword);
    router.delete("/delete", auth, user.delete);

    router.delete("/admin/delete", admin, user.delete);

    app.use('/api/user', router);
}