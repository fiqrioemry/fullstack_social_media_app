"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Like);
      this.hasMany(models.Comment);

      this.belongsTo(models.User, {
        foreignKey: "userId",
      });

      this.belongsTo(models.Post, {
        foreignKey: "postId",
        as: "comments",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.Comment, {
        foreignKey: "commentId",
        as: "replies",
        onDelete: "CASCADE",
      });
    }
  }
  Comment.init(
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      commentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      comment: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
