// La idea: una sola ruta Get con filtros y ordenes por query
//Orden: alfabetico, precio, ninguno
//Filtros: nombre, genero, tipo, marca

//deberia ir en la ruta "GET /"
//Los query serian: order (alfabetico o precio) si no llega no ordenar
// filtros: name, genre, type, brand (texto)

//Genero: male, female, unisex
// tipo: un string
//brand: un string

//entonces el handler le pasa al controller 5 parametros (genre, type, brand, orderBy, orderDirection)
const { Product, Stocksize } = require("../db");
const { Op } = require("sequelize");

const getProductsFilteredAndOrdered = async (
  name,
  genre,
  type,
  brand,
  orderBy,
  orderDirection
) => {
  let where = {};
  if (name)
    where = {
      ...where,
      name: {
        [Op.iLike]: "%" + name + "%",
      },
    };
  if (genre) where = { ...where, genre };
  if (type) where = { ...where, type };
  if (brand) where = { ...where, brand };
  //   console.log(where);
  let order = [];
  if (orderBy && orderDirection) order = [[orderBy, orderDirection]];
  try {
    const products = await Product.findAll({
      where,
      order,
      include: [Stocksize],
    });

    return products;
  } catch (error) {
    throw Error(error.message);
  }
};

const filterAndOrderHandler = async (req, res) => {
  const { name, genre, type, brand, orderBy, orderDirection } = req.query;
  try {
    if (genre && !["female", "male", "unisex"].includes(genre.toLowerCase()))
      res.status(400).send("Genero no valido");
    const products = await getProductsFilteredAndOrdered(
      name,
      genre,
      type,
      brand,
      orderBy,
      orderDirection
    );
    if (products) {
      res.json(products);
    } else {
      res.status(404).send("no se hallaron productos");
    }
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = filterAndOrderHandler;
