const db = require("../models");
const User = db.user;
const Message = db.message;
const Answer = db.answer;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.text) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a message
    const answer = {
      user_id: req.userId,
      text: req.body.text,
      message_id: req.params.id
    };
  console.log(answer)
    // Save message in the database
    Answer.create(answer)
      .then(data => {
        res.send(data);
      })
      .catch(error => {
        res.status(500).send({
          message:
            error
        });
      });
    };

exports.answersList = async(req, res)=> {
  try{
    const answers = await Answer.findAll({
      where: {message_id: req.params.id}
    });
    return res.json({messages:answers})
  } catch (error) {
    console.log(error)
  }
}

exports.getAnswers = async(req, res, next) => {
    try {
      const message =  await Answer.findByPk(req.params.id, {
        paranoid: true,
        attributes:['text'],
        include:[
          {
            model: Message,
            as:"parentMessage",
            attributes:['title','text','user_id']
          }
        ]
      })
      return res.json({messages:message})
    } catch (error) {
      console.log(error)
    }
  }