const {
  getAllProductsController,
  createProductController,
  changePriceController,
  getProductsByPriceController,
  getByAlphabeticallyController,
  getProductsByTypeController,
  getProductsByBrandController,
  getGenreController,
  getProductsFilteredAndOrdered,
  getBrandsController,
} = require("../Controller/productsControllers");

const getAllProductsHandler = async (req, res) => {
  if (req.query) {
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
  } else {
    try {
      const responseController = await getAllProductsController();
      res.status(200).json(responseController);
    } catch (error) {
      res.status(404).send("Not find products");
    }
  }
};

const createProductsHandler = async (req, res) => {
  const { image, name, price, brand, type, color, genre } = req.body;

  try {
    const responseController = await createProductController({
      image,
      name,
      price,
      brand,
      type,
      color,
      genre,
    });
    res.status(201).json(responseController);
  } catch (error) {
    res.status(417).send("Error creating product");
  }
};
const changePriceHandler = async (req, res) => {
  const { productId } = req.params;
  const { price } = req.body;
  try {
    const updateProduct = await changePriceController(productId, price);
    res.status(200).json(updateProduct);
  } catch (error) {
    console.error("Error changing product price:", error.message);
    res.status(417).send("Error changing price");
  }
};

const filterByPriceHandler = async (req, res) => {
  const { orderType } = req.params;

  const productsFiltered = await getProductsByPriceController(orderType);
  try {
    res.status(200).json(productsFiltered);
  } catch (error) {
    res.status(417).send("Error filtering products by price"); // 417 Expectation Failed
  }
};

const filterByAlphabeticallyHandler = async (req, res) => {
  const { orderAlphabetically } = req.params;
  const aZorder = await getByAlphabeticallyController(orderAlphabetically);
  try {
    res.status(200).json(aZorder);
  } catch (error) {
    res.status(417).send("Error filtering products by alphabetically order");
  }
};

const filterByGenreHandler = async (req, res) => {
  const { typeGenre } = req.params;
  const genreFilter = await getGenreController(typeGenre);
  try {
    res.status(200).json(genreFilter);
  } catch (error) {
    res.status(417).send("Error filtering products by genre");
  }
};

const filterByTypeHandler = async (req, res) => {
  const { filterByType } = req.params;

  const productsFiltered = await getProductsByTypeController(filterByType);
  try {
    res.status(200).json(productsFiltered);
  } catch (error) {
    res.status(417).send("Error filtering products by type"); // 417 Expectation Failed
  }
};

const filterByBrandHandler = async (req, res) => {
  const { filterByBrand } = req.params;

  const productsFiltered = await getProductsByBrandController(filterByBrand);
  try {
    res.status(200).json(productsFiltered);
  } catch (error) {
    res.status(417).send("Error filtering products by brand"); // 417 Expectation Failed
  }
};

//GET Brands
const getBrandsHandler = async (req, res) => {
  try {
    const brandsList = await getBrandsController();
    res.json(brandsList);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllProductsHandler,
  createProductsHandler,
  // filterByPriceHandler,
  // filterByAlphabeticallyHandler,
  // filterByGenreHandler,
  // filterByTypeHandler,
  // filterByBrandHandler,
  changePriceHandler,
  getBrandsHandler,
};
