"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsTo(models.Post, { foreignKey: "postId" });
      this.belongsTo(models.Comment, { foreignKey: "commentId" });
    }
  }
  Like.init(
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      commentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
