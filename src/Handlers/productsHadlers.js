const {
  getAllProductsController,
  createProductController,
  changePriceController,
  getBrandsController,
  getProductsFilteredAndOrdered,
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
  getBrandsHandler,
  changePriceHandler,
};
