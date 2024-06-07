const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      short_description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      discount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      image_cover_url: {
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "productos",
      timestamps: false,
    }
  );
  return Product;
};
