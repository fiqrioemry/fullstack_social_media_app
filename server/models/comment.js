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
      this.hasMany(models.Reply, { onDelete: "CASCADE" });

      this.hasMany(models.Like, {
        foreignKey: "entityId",
        constraints: false,
        onDelete: "CASCADE",
        scope: {
          entityType: "comment",
        },
      });
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
      this.belongsTo(models.Post, {
        foreignKey: "postId",
        onDelete: "CASCADE",
      });
    }
  }
  Comment.init(
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
