const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
      },
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./productModel.js")(sequelize, Sequelize);
db.developer = require("./developerModel.js")(sequelize, Sequelize);

//Relacion uno a muchos developers/games
db.developer.hasMany(db.products, {
  as: "developer",
  foreignKey: {
    name: "developer_id",
    allowNull: false,
    unique: false,
    onDelete: "CASCADE",
    /*  onUpdate: "NO ACTION", */
  },
});
db.products.belongsTo(db.developer, {
  as: "developer",
  foreignKey: {
    name: "developer_id",
    allowNull: false,
    unique: false,
    onDelete: "CASCADE",
    /*  onUpdate: "NO ACTION", */
  },
});

module.exports = db;
