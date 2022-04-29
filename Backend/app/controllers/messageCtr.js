const db = require("../models");
const User = db.user;
const Message = db.message;
const Answer = db.answer;
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
      user_id: req.userId,
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
  try {
    const listOfMessages =  await Message.findAll({
      attributes:['id','title','text','likeList'],
      include:[
        {
          model: User,
          as:"author",
          attributes:['id','email','lastName','firstName','profilePic','isAdmin']
        }
      ],
      order:[
        ['createdAt','DESC']
      ]
    })

    return res.json({messages:listOfMessages})
  } catch (error) {
    console.log(error)
  }

  };

  exports.findAllSignaled = async (req, res) => {
    try {
      const listOfMessages =  await Message.findAll({
        where:{signaled:true},
        attributes:['id','title','text','likeList'],
        include:[
          {
            model: User,
            as:"author",
            attributes:['id','email','lastName','firstName','profilePic','isAdmin']
          }
        ],
        order:[
          ['createdAt','DESC']
        ]
      })
  
      return res.json({messages:listOfMessages})
    } catch (error) {
      console.log(error)
    }
  
    };
  
// Find a single message with an id
exports.findOne = async (req, res) => {
  try {
    const message =  await Message.findByPk(req.params.id, {
      paranoid: true,
      include:[
        {
          model: User,
          as:"author",
          attributes:['id','email','lastName','firstName','profilePic','isAdmin']
        }
      ]
    })
    return res.json({messages:message})
  } catch (error) {
    console.log(error)
  }
};

// Update a message by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    if(req.body.likeList || req.body.isDeleted || req.body.signaled){
      return res.json({message:"invalid request"});
    };
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
          message: "Error updating message with id= " + id
        });
      });
  };

// Delete a message with the specified id in the request
exports.delete = async (req, res) => {
  let messageId = req.params.id
  try{
    const deletedMessage = await Message.destroy({
      where: {
        id: messageId
      }
    });
    return res.json({messages:deletedMessage})
  } catch (error){
    console.log(error)
  }
};

exports.isLiked = async(req, res, next) => {
  const userId = req.body.id;
  let messageId = req.params.id;
  let option = req.body.likes;
  let response = {code:200,message:"an error occured, try again later"}
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
      response['message']="deleted like"
      break;
    
    case 1: 
      response['message']="added like"
      usersLikes.push(userId)
      break;      
  }
  res.status(response['code']).json({message:response['message']})
}

exports.isSignaled = async(req, res) => {
  const id = req.params.id;
  if(req.body.likeList || req.body.isDeleted || req.body.text){
    return res.json({message:"invalid request"});
  };
  Message.update(req.body.signaled, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Message was signaled."
        });
      } else {
        res.send({
          message: `Cannot signal message with id=${id}. invalid request`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error signaling message with id= " + id
      });
    });
};