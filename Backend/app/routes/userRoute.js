    const user = require("../controllers/userCtr");
    var router = require("express").Router();
  
    router.post("/signup", user.signup);
    router.post("/login", user.login);
    //router.put("/:id", user.update);
    //router.delete("/:id", user.delete);

    module.exports = router;