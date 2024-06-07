const db = require("../models/sequelizeModelConfig");
const Product = db.products;
const Developer = db.developer;

exports.getAllProducts = async (req, res) => {
  try {
    //trae el nombre del developer en vez del id
    const products = await Product.findAll({
      include: [{ model: Developer, required: true, as: "developer" }],
    });

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error obteniendo productos", error });
  }
};

exports.getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }
    res.json(product);
  } catch (error) {
    res.status(500).send("Error obteniendo producto");
  }
};

exports.createProduct = async (req, res) => {
  const { title, price, developer_id } = req.body;
  if ((!title, !price, !developer_id)) {
    return res.status(500).send({
      message: "Los valores title, price y developer_id son obligatorios",
    });
  }
  try {
    const newProduct = await Product.create(req.body);
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).send({ message: "Error creando producto", error: error });
  }
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  const { title, price, developer_id } = req.body;
  if (!id) {
    return res.status(500).send({
      message: "No se envió el id del producto",
    });
  }
  if ((!title, !price, !developer_id)) {
    return res.status(500).send({
      message: "Los valores title, price y developer_id son obligatorios",
    });
  }
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }
    const updated = await product.update(req.body);
    res
      .status(204)
      .send({ message: "Actualizado con éxito", product: updated });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error actualizando producto", error: error });
  }
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(500).send({
      message: "No se envió el id del producto",
    });
  }
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }
    await product.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send("Error eliminando producto");
  }
};
