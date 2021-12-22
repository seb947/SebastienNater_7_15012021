module.exports = app => {
    const message = require("../controllers/messageCtr");
    var router = require("express").Router();
  
    // Create a new message
    router.post("/", message.create);
  
    // Retrieve all messages
    router.get("/", message.findAll);
  
    // Retrieve a single message with id
    router.get("/:id", message.findOne);
  
    // Update a message with id
    router.put("/:id", message.update);
  
    // Delete a message with id
    router.delete("/:id", message.delete);
  
    // Add or remove like from a message
    //router.post('/:id/like', message.isLiked);

    // Delete all messages
    //router.delete("/", message.deleteAll);

     // Retrieve all published messages
    //router.get("/published", message.findAllPublished);
  
    app.use('/api/message', router);
  };