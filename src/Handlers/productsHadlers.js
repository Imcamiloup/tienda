const {
  getAllProductsController,
  createProductController,
  getProductsByPriceController,
  getByAlphabeticallyController,
  getProductsByTypeController,
  getProductsByBrandController,
  getGenreController,
} = require("../Controller/productsControllers");

const getAllProductsHandler = async (req, res) => {
  try {
    const responseController = await getAllProductsController();
    res.status(200).json(responseController);
  } catch (error) {
    res.status(404).send("Not find products");
  }
};

const createProductsHandler = async (req, res) => {
  const { image, name, price, brand, size, type, color, genre } = req.body;

  try {
    const responseController = await createProductController({
      image,
      name,
      price,
      brand,
      size,
      type,
      color,
      genre,
    });
    res.status(201).json(responseController);
  } catch (error) {
    res.status(417).send("Error creating product");
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

const filterByGenreHandler = async(req, res)=>{
  const {typeGenre} = req.params
  const genreFilter = await getGenreController(typeGenre);
  try {
    res.status(200).json(genreFilter)
  } catch (error) {res.status(417).send("Error filtering products by genre")
    
  }
};

const filterByTypeHandler = async (req, res) => {
  const { filterByType } = req.params;

  const productsFiltered = await getProductsByTypeController(filterByType)
  try {
    res.status(200).json(productsFiltered)
  }
  catch (error) {
    res.status(417).send("Error filtering products by type");  // 417 Expectation Failed
  }

}

const filterByBrandHandler = async (req, res) => {
  const { filterByBrand } = req.params;

  const productsFiltered = await getProductsByBrandController(filterByBrand)
  try {
    res.status(200).json(productsFiltered)
  }
  catch (error) {
    res.status(417).send("Error filtering products by brand");  // 417 Expectation Failed
  }
}


module.exports = {
  getAllProductsHandler,
  createProductsHandler,
  filterByPriceHandler,
  filterByAlphabeticallyHandler,
  filterByGenreHandler,
  filterByTypeHandler,
  filterByBrandHandler
};
