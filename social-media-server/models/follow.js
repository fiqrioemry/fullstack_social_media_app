'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    static associate(models) {
      Follow.belongsTo(models.User, {
        foreignKey: 'followerId',
        as: 'follower',
      });
      Follow.belongsTo(models.User, {
        foreignKey: 'followingId',
        as: 'following',
      });
    }
  }

  Follow.init(
    {
      followerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      followingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
        validate: {
          isIn: [['active', 'inactive']],
        },
      },
    },
    {
      sequelize,
      modelName: 'Follow',
    },
  );

  return Follow;
};
