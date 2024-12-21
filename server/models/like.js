"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The models/index file will call this method automatically.
     */
    static associate(models) {
      // Relasi Like ke User
      this.belongsTo(models.User, { foreignKey: "userId" });

      this.belongsTo(models.Post, {
        foreignKey: "entityId",
        constraints: false,
        onDelete: "CASCADE",
        scope: {
          entityType: "post",
        },
      });
      this.belongsTo(models.Comment, {
        foreignKey: "entityId",
        constraints: false,
        onDelete: "CASCADE",
        scope: {
          entityType: "comment",
        },
      });
      this.belongsTo(models.Reply, {
        foreignKey: "entityId",
        constraints: false,
        onDelete: "CASCADE",
        scope: {
          entityType: "reply",
        },
      });
    }
  }

  Like.init(
    {
      userId: DataTypes.INTEGER,
      entityType: {
        type: DataTypes.ENUM("post", "comment", "reply"),
        allowNull: false,
      },
      entityId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Like",
    }
  );

  return Like;
};
