const { Product, Stocksize } = require("../db");

let arrayFilter = [];
let BooleanFilterType = false;
let BooleanFilterBrand = false;

const getAllProductsController = async () => {
  try {
    const products = await Product.findAll({
      include: [Stocksize], // Incluir información de stock
    });
    arrayFilter=products;
    return products;
  } catch (error) {
    throw new Error("Error getting all products: " + error.message);
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

const getProductsByPriceController =  (orderType) => {
  //arr.sort((a, b) => a - b)
  if (orderType === "ascendent") {
    const orderArray = arrayFilter.sort((a, b) => a.price - b.price);
    arrayFilter = orderArray;

    return orderArray;
  } else if (orderType === "descendent") {
    const orderArray = arrayFilter.sort((a, b) => b.price - a.price);
    arrayFilter = orderArray;

    return orderArray;
  }
};

const getByAlphabeticallyController =  (orderAlphabetically) => {
  try {
    if (orderAlphabetically === "A-Z") {
      arrayFilter.sort((a, b) => a.name.localeCompare(b.name));
    } else if (orderAlphabetically === "Z-A") {
      arrayFilter.sort((a, b) => b.name.localeCompare(a.name));
    }

    return arrayFilter;
  } catch (error) {
    throw new Error(
      "Error filtering products by alphabetical order: " + error.message
    );
  }
};

const getGenreController = async (typeGenre) => {
  try {
    let genreArray;
    if (typeGenre === "unisex") {
      genreArray = await Product.findAll({
        where: {
          genre: "unisex",
        },
      });
    } else if (typeGenre === "male") {
      genreArray = await Product.findAll({
        where: {
          genre: "male",
        },
      });
    } else if (typeGenre === "female") {
      genreArray = await Product.findAll({
        where: {
          genre: "female",
        },
      });
    }

    arrayFilter = genreArray;

    return genreArray;
  } catch (error) {
    throw new Error("Error filtering products by genre: " + error.message);
  }
};

const getProductsByTypeController =  (filterType) => {
  try {
    const filterProductsByType = (type) => {
      return arrayFilter.filter((product) => product.type.toLowerCase() === type.toLowerCase());
    };

    if (BooleanFilterType === false) {
      const filteredArray = filterProductsByType(filterType);
      arrayFilter = filteredArray;
      BooleanFilterType = true;
      return arrayFilter;
    } else {
      throw "type does not exist, please enter a valid type.";
    }
  } catch (error) {
    return error;
  }
};

const getProductsByBrandController =  (filterBrand) => {
  try {
    const filterProductsByBrand = (brand) => {
      return arrayFilter.filter((product) => product.brand.toLowerCase() === brand.toLowerCase());
    };

    if (BooleanFilterBrand === false) {
      const filteredArray = filterProductsByBrand(filterBrand);
      arrayFilter = filteredArray;
      BooleanFilterBrand = true;
      return arrayFilter;
    } else {
      throw "type does not exist, please enter a valid brand.";
    }
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllProductsController,
  createProductController,
  getProductsByPriceController,
  getProductsByTypeController,
  getProductsByBrandController,
  getByAlphabeticallyController,
  getGenreController,
};
