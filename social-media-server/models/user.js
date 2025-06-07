'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasOne(models.Profile, { foreignKey: 'userId', as: 'profile' });
      this.hasMany(models.Post, { foreignKey: 'userId' });
      this.hasMany(models.Like);
      this.hasMany(models.Comment, { foreignKey: 'userId' });

      this.belongsToMany(models.User, {
        through: models.Follow,
        as: 'Followers',
        foreignKey: 'followingId',
      });

      this.belongsToMany(models.User, {
        through: models.Follow,
        as: 'Followings',
        foreignKey: 'followerId',
      });

      // 🔹 Relasi untuk Bookmark (User bisa menyimpan banyak post)
      this.hasMany(models.Bookmark, { foreignKey: 'userId', as: 'bookmarks' });

      // 🔹 Relasi ke Chat
      this.hasMany(models.Chat, { foreignKey: 'senderId' });
      this.hasMany(models.Chat, { foreignKey: 'receiverId' });

      // 🔹 Relasi untuk Notifikasi
      this.hasMany(models.Notification, {
        foreignKey: 'receiverId',
      });
      this.hasMany(models.Notification, {
        foreignKey: 'senderId',
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isPrivate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
