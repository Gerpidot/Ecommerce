const express = require("express");
const router = express.Router();
const developerControlers = require("../controllers/developersControllers");

router.get("/developers", developerControlers.getAllDevelopers);
//router.get("/productos/:id", productController.getProductById);
router.post("/developers", developerControlers.postDeveloper);
//router.put("/productos/:id", productController.updateProduct);
router.delete("/developers/:id", developerControlers.deleteDeveloper);

module.exports = router;
