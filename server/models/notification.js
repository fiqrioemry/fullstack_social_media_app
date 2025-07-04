'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      this.belongsTo(models.Post, {
        as: 'post',
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.Comment, {
        as: 'comment',
        onDelete: 'CASCADE',
      });

      this.belongsTo(models.User, { foreignKey: 'senderId', as: 'sender' });
      this.belongsTo(models.User, { foreignKey: 'receiverId', as: 'receiver' });
    }
  }

  Notification.init(
    {
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      commentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      type: {
        type: DataTypes.ENUM('like', 'comment', 'follow', 'mention', 'reply'),
        allowNull: false,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Notification',
    },
  );

  return Notification;
};
