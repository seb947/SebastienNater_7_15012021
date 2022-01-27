module.exports = app => {
    const message = require("../controllers/messageCtr");
    const auth = require('../middleware/auth.js');
    var router = require("express").Router();
  
    router.post("/", auth, message.create);
    router.get("/", auth, message.findAll);
    router.get("/:id", auth, message.findOne);
    router.put("/:id", auth, message.update);
    router.delete("/:id", auth, message.delete);
    router.post("/:id/like", auth, message.isLiked);

    app.use('/api/message', router);
  };