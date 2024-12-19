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
      // Relasi self-referencing untuk balasan komentar
      this.hasMany(models.Comment, {
        foreignKey: "commentId",
        as: "replies",
      });

      // Relasi balasan ke komentar induk (self-referencing)
      this.belongsTo(models.Comment, {
        foreignKey: "commentId",
        as: "parentComment", // Alias untuk komentar induk
      });

      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsTo(models.Post, { foreignKey: "postId" });
    }
  }
  Comment.init(
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      commentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Comment",
          key: "id",
        },
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
