module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define("message", {
      author: {
        type: DataTypes.INTEGER,
        required: true
      },
      title: {
        type: DataTypes.STRING,
        required: true
      },
      text: {
        type: DataTypes.STRING,
        required: true
      },
      // ajout picture , pour image message
      likeList: {
        type: DataTypes.TEXT,
      },
      // answersList: {
      //   type: Sequelize.TEXT,
      //   defaultValue: ""
      // },
      // model comment , et tu lie message et comment(message_id,content,user_id)
      // soft delete
      signaled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isDeleted: {
        type: DataTypes.DATE,
        default: null
      }
    });

     Message.associate = models =>{
       Message.belongsTo(models.users)
     }
  
    return Message;
  };