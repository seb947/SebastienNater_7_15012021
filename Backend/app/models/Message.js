module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("message", {
      author: {
        type: Sequelize.STRING,
        required: true
      },
      title: {
        type: Sequelize.STRING,
        required: true
      },
      text: {
        type: Sequelize.STRING,
        required: true
      },
      // ajout picture , pour image message
      likeList: {
        type: Sequelize.TEXT,
      },
      // answersList: {
      //   type: Sequelize.TEXT,
      //   defaultValue: ""
      // },
      // model comment , et tu lie message et comment(message_id,content,user_id)
      // soft delete
      signaled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isDeleted: {
        type: Sequelize.DATE,
        default: null
      }
    });
  
    return Message;
  };