module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define("message", {
      user_id: {
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
      picture:{
        type: DataTypes.STRING,
      },
      likeList: {
        type: DataTypes.TEXT,
      },
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
       Message.belongsTo(models.user,
        {
          onDelete:"cascade",
          foreignKey:"user_id",
          as:"author"
        });
      Message.hasMany(models.answer,
        {
          onDelete:"cascade",
          foreignKey:"message_id",
          as:"answers"
        });
     }
     
      

  
    return Message;
  };