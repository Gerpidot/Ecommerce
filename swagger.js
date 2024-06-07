const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

//const getProductsAll = YAML.load("./app/routes/docs/productsDocs.yaml");
const docsPath = path.resolve(__dirname, "docs");

const loadYAMLFiles = (dir) => {
  const files = fs.readdirSync(dir);
  let combinedDoc = {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
    },
    paths: {},
  };

  files.forEach((file) => {
    const doc = yaml.load(fs.readFileSync(path.join(dir, file), "utf8"));
    combinedDoc.paths = { ...combinedDoc.paths, ...doc.paths };
  });

  return combinedDoc;
};

const swaggerDocument = loadYAMLFiles(docsPath);
/* const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NeonGames API",
      description: "API endpoints for NeonGames services documented on swagger",
      contact: {
        name: "codoacodo",
        email: "codo@codo",
        url: "...",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8080/",
        description: "Local server",
      },
      {
        url: "<your live url here>",
        description: "Live server",
      },
    ],
  },
  // looks for configuration in specified directories
  apis: ["./app/routes/docs/productsDocs.yaml"],
};
const swaggerSpec = swaggerJsdoc(options); */
function swaggerDocs(app, port) {
  // Swagger Page
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      customCssUrl: "swagger_dark.css",
      customCss: "./swagger_dark.css",
    })
  );
  // Documentation in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}
module.exports = swaggerDocs;
