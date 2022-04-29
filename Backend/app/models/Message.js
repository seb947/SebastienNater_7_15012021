const sequelizeSoftDelete = require('sequelize-soft-delete')

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
      signaled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isDeleted: {
        type: DataTypes.DATE,
        default: null,
      },
    },{
      paranoid: true,
      deletedAt: 'isDeleted'
    });

     Message.associate = models =>{
      Message.belongsTo(models.user,
        {
          foreignKey:"user_id",
          as:"author"
        });
      Message.hasMany(models.answer,
        {
          onDelete:"cascade",
          as:"answer"
        });
     }
    return Message;
  };