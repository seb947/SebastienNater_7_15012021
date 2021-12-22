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
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      dislikes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      likeList: {
        type: Sequelize.TEXT
      },
      dislikeList: {
        type: Sequelize.TEXT
      },
      answersList: {
        type: Sequelize.TEXT
      },
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