"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Like, {
        foreignKey: "entityId",
        constraints: false,
        onDelete: "CASCADE",
        scope: {
          entityType: "reply",
        },
      });
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsTo(models.Comment, {
        foreignKey: "commentId",
        onDelete: "CASCADE",
      });
    }
  }
  Reply.init(
    {
      userId: DataTypes.INTEGER,
      commentId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Reply",
    }
  );
  return Reply;
};
