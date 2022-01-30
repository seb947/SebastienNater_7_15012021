module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      email: {
        type: Sequelize.STRING,
        required: true
      },
      password: {
        type: Sequelize.STRING,
        required: true
      },
      firstName: {
        type: Sequelize.STRING,
        required: true
      },
      lastName: {
        type: Sequelize.STRING,
        required: true
      },
      profilePic: {
        type: Sequelize.STRING,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });

    User.associate = models => {
      User.hasMany(models.message,
        {
          onDelete: "cascade",
          as: "message"
        });
    };
  
    return User;
  };