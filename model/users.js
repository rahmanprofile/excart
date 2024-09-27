const { DataTypes } = require("sequelize");
const sequelize = require("../config/confg");

const users = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true, // Specify that this is the primary key
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'N/A', 
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'N/A', 
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true, 
    defaultValue: 'N/A', 
  },
});

module.exports = users;
