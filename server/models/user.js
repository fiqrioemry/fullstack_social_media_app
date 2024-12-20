"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Profile);
      this.hasMany(models.Post);
      this.hasMany(models.Like);
      this.hasMany(models.Comment);
      this.hasMany(models.Reply);

      // many to many relation
      this.belongsToMany(models.User, {
        through: models.Follow,
        as: "Followers",
        foreignKey: "followingId",
      });

      this.belongsToMany(models.User, {
        through: models.Follow,
        as: "Followings",
        foreignKey: "followerId",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isPrivate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
