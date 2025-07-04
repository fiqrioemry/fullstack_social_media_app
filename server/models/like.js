'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'likes' });

      this.belongsTo(models.Post, {
        foreignKey: 'entityId',
        constraints: false,
        onDelete: 'CASCADE',
        scope: { entityType: 'post' },
      });

      this.belongsTo(models.Comment, {
        foreignKey: 'entityId',
        constraints: false,
        onDelete: 'CASCADE',
        scope: { entityType: 'comment' },
      });
    }
  }

  Like.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      entityType: {
        type: DataTypes.ENUM('post', 'comment'),
        allowNull: false,
      },
      entityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Like',
    },
  );

  return Like;
};
