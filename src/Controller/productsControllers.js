const { Product, Stocksize } = require("../db");
const { Op } = require("sequelize");

let arrayFilter = [];
let BooleanFilterType = false;
let BooleanFilterBrand = false;

const getAllProductsController = async () => {
  try {
    const products = await Product.findAll({
      include: [Stocksize], // Incluir información de stock
    });
    arrayFilter = products;
    return products;
  } catch (error) {
    throw new Error("Error getting all products: " + error.message);
  }
};

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

const createProductController = async ({
  image,
  name,
  price,
  brand,
  type,
  color,
  genre,
}) => {
  try {
    const newProduct = await Product.create({
      image,
      name,
      price,
      brand,
      type,
      color,
      genre,
    });
    return newProduct;
  } catch (error) {
    throw new Error("Error creating product: " + error.message);
  }
};

const changePriceController = async (productId, price) => {
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    product.price = price;
    await product.save();
    return "Price updated correctly: " + product.price;
  } catch (error) {
    throw new Error("Error updating product price: " + error.message);
  }
};

const getBrandsController = async () => {
  try {
    let brands = await Product.findAll({
      attributes: ["brand"], // Columna que quieres seleccionar
      group: ["brand"], // Agrupa por esta columna para obtener valores únicos
      //raw: true, // Devuelve solo los datos sin metadatos adicionales
    });
    brands = brands.map((item) => item.brand);
    console.log(brands);

    return brands;
  } catch (error) {
    console.log(error.message);
  }
};

const getProductByIdController = async (id) => {
  try {
    const product = await Product.findOne({
      where: { id },
      include: [Stocksize],
    });
    return product;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  getAllProductsController,
  createProductController,
  changePriceController,
  getProductsFilteredAndOrdered,
  getBrandsController,
  getProductByIdController,
};
