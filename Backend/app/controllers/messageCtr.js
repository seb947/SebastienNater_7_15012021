const db = require("../models");
const User = require("../models/User");
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
exports.findAll = async (req, res) => {
  
  const listOfMessages =  await Message.findAll({
      attributes:['id','author','title','text','likeList'],
      include:[
        {
          model: User,
          as:"author",
          attributes:['email','lastName','firstName','profilePic','isAdmin']
        }
      ],
      order:[
        ['createdAt','DESC']
      ]
    })
    console.log(listOfMessages);

    return listOfMessages;
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

  exports.isLiked = async(req, res, next) => {
    const userId = req.body.id;
    let messageId = req.params.id;
    let option = req.body.likes;
    let response = {code:200,message:"an error occured, try again later"}
    post = await Message.findOne({ id: messageId })
    console.log(post)
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

