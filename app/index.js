const express = require("express");
const sequelize = require("../database/dbconfig");
const swaggerDocs = require("../swagger");

//Routes
const productRouter = require("./routes/productsRoutes"); // Importa las rutas de productos
const developerRouter = require("./routes/developerRoutes");
const app = express();

//port
const port = 8080;

// Para requests con payload JSON
app.use(express.json());

// Para requests con payload urlencoded
app.use(express.urlencoded({ extended: true }));

//rutas de la api
app.use("/api", productRouter); // Usa las rutas de productos, redefine para api/products/la zaraza
app.use("/api", developerRouter);

//Captura el path "/" y devulve un string easy
app.get("/", (req, res) => {
  res.redirect("/docs/");
});

const db = require("./models/sequelizeModelConfig");

// Probar la conexión a la base de datos
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la base establecida correctamente.");
 
    try {
      db.sequelize.sync(/* { force: true } */); // Sincronizar modelos
      console.log("Modelos sincronizados con la base de datos.");
      app.listen(port, () => {
        swaggerDocs(app, port);
        console.log(`API escuchando en http://localhost:${port}`);
      });
    } catch (error) {
      console.error("Error sincronizando los modelos:", error);
      console.log("No se pudo realizar la conexión al servidor");
    }
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
  });
