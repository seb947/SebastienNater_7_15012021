const db = require("../models");
const Message = db.messages;
const Op = db.Sequelize.Op;

// Create and Save a new message
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a message
    const message = {
      author: req.body.author,
      title: req.body.title,
      text: req.body.text,
      likeList:JSON.stringify([])
    };
    // Save message in the database
    Message.create(message)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the message."
        });
      });
  };

// Retrieve all messages from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Message.findAll(/*{ where: condition }*/)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving message."
        });
      });
  };
  
// Find a single message with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Message.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find message with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving message with id=" + id
        });
      });
  };

// Update a message by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Message.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Message was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update message with id=${id}. Maybe message was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating message with id=" + id
        });
      });
  };

// Delete a message with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Message.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "message was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete message with id=${id}. Maybe message was not found!`
          });
        }
      })
      .catch(err => {
        err.status(500).send({
          message: "Could not delete message with id=" + id
        });
      });
  };

/* Delete all messages from the database.
exports.deleteAll = (req, res) => {
    Message.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Messages were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all messages."
        });
      });
  };

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Message.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving messages."
        });
      });
  };*/

  exports.isLiked = async(req, res, next) => {
    const userId = req.body.id;
    let messageId = req.params.id;
    let option = req.body.likes;
    let response = {code:200,message:"une erreur survenue ressaye plus tard"}
    post = await Message.findOne({ id: messageId })
    if(!post){
      response['code']=500
      res.status(response['code']).json({message:response['message']})
    }
    // post exit
    let usersLikes =JSON.parse( post.likeList)
    switch (parseInt(option))
     {
      case 0: 
        usersLikes =  usersLikes.filter(id=>id !=userId)
        response['message']="user a supprimer son like"
        break;
      
      case 1: 
        response['message']="user like"
        usersLikes.push(userId)
        break;      
    }
    res.status(response['code']).json({message:response['message']})

  }

