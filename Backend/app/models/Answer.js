module.exports = (sequelize, DataTypes) => {
    const Answer = sequelize.define("answer", {
      user_id: {
        type: DataTypes.INTEGER,
        required: true
      },
      text: {
        type: DataTypes.STRING,
        required: true
      },
      message_id: {
        type: DataTypes.INTEGER,
        default: null
      }
    });

     Answer.associate = models =>{
       Answer.belongsTo(models.user,
        {
        onDelete:"cascade",
        foreignKey:"user_id",
        as:"author"
        }
      )
     }
  
    return Answer;
  };