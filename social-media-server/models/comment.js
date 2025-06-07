'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.User, { as: 'user' });
      this.belongsTo(models.Post, {
        foreignKey: 'postId',
        onDelete: 'CASCADE',
      });

      this.belongsTo(models.Comment, {
        foreignKey: 'parentId',
        onDelete: 'CASCADE',
      });

      this.hasMany(models.Comment, {
        as: 'replies',
        foreignKey: 'parentId',
        onDelete: 'CASCADE',
      });

      this.hasMany(models.Like, {
        foreignKey: 'entityId',
        as: 'likes',
        constraints: false,
        onDelete: 'CASCADE',
        scope: {
          entityType: 'comment',
        },
      });

      this.hasMany(models.Notification, {
        foreignKey: 'commentId',
      });
    }
  }

  Comment.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Comments',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Comment',
    },
  );

  return Comment;
};
