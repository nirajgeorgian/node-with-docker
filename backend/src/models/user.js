"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toJSON() {
      // hide protected fields
      const values = Object.assign({}, this.get());
      values.createdAt = values.createdAt.toString();

      delete values.password;
      return values;
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING },
      aadharNo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
      freezeTableName: true,
      hooks: {
        beforeSave: (user, options) => {
          return bcrypt
            .hash(user.password, 10)
            .then((hash) => {
              user.password = hash;
            })
            .catch((err) => {
              throw new Error("Password Hashing Error");
            });
        },
      },
    }
  );

  return User;
};
