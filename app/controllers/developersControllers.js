const db = require("../models/sequelizeModelConfig");
const Developer = db.developer;
exports.getAllDevelopers = async (req, res) => {
  try {
    const developers = await Developer.findAll();
    res.status(200).send(developers);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "No fué posible obtener la lista de developers",
      error: error,
    });
  }
};

exports.postDeveloper = async (req, res) => {
  console.log(req.body);
  try {
    const { company_name, description } = req.body;
    if (!company_name) {
      return res
        .status(500)
        .send({ message: "Ingresa el nombre de la companía para continuar." });
    }
    //armo el objeto a crear
    const newDevelop = { company_name: company_name, description: description };
    const developer = await Developer.create(newDevelop);

    //response pal front
    res
      .status(200)
      .send({ message: "Developer creado con éxito", developer: developer });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "No fué posible crear el desarrollador", error: error });
  }
};

exports.deleteDeveloper = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(500).send({
      message: "No se envió el id del developer",
    });
  }
  try {
    const developer = await Developer.findByPk(id);
    if (!developer) {
      return res.status(404).send("Developer no encontrado");
    }
    await developer.destroy();
    res
      .status(204)
      .send({
        message: "Developer eliminado con éxito y sus productos asociados",
      });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error al eliminar el developer", error: error });
  }
};
