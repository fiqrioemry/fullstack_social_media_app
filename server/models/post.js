"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
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
          entityType: "post",
        },
      });
      this.hasMany(models.Comment, { onDelete: "CASCADE" });
      this.hasMany(models.PostGallery, { onDelete: "CASCADE" });
      this.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Post.init(
    {
      userId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
