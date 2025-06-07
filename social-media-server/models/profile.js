'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User);
    }
  }
  Profile.init(
    {
      userId: DataTypes.INTEGER,
      fullname: DataTypes.STRING,
      avatar: DataTypes.STRING,
      bio: DataTypes.TEXT,
      birthday: DataTypes.STRING,
      gender: {
        type: DataTypes.ENUM,
        values: ['male', 'female'],
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Profile',
    },
  );
  return Profile;
};
