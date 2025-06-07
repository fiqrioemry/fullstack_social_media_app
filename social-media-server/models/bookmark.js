'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    static associate(models) {
      this.belongsTo(models.User, { as: 'user', onDelete: 'CASCADE' });

      this.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post',
        onDelete: 'CASCADE',
      });
    }
  }

  Bookmark.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Bookmark',
    },
  );

  return Bookmark;
};
