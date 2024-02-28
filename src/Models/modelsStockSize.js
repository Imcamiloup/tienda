const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Stocksize", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    size: {
      type: DataTypes.INTEGER, // o puedes utilizar STRING si las tallas son alfanuméricas
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
};
