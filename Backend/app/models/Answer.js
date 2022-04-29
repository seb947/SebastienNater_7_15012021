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
      required: true
    }
  });

  Answer.associate = models =>{
    Answer.belongsTo(models.user,
      {
        foreignKey:"user_id",
        as:"author"
      }
    ),
    Answer.belongsTo(models.message,
      {
        foreignKey:"message_id",
        as:"parentMessage"
      }
    )
  }
  return Answer;
};