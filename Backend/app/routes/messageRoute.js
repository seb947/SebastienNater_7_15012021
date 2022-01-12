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
  
    // Add or remove like from a message
    //router.post('/:id/like', message.isLiked);

    // Delete all messages
    //router.delete("/", message.deleteAll);

     // Retrieve all published messages
    //router.get("/published", message.findAllPublished);
  
    app.use('/api/message', router);
  };