const { addStockToProductController, sellProduct } = require("../Controller/stockControllers");

const addStockToProductHandler = async (req, res) => {
  const { productId, size, quantity } = req.body;

  try {
    const stockEntry = await addStockToProductController({ productId, size, quantity });
    res.status(201).json(stockEntry);
  } catch (error) {
    console.error("Error adding stock to product:", error);
    res.status(500).send("Internal Server Error");
  }
};
const sellProductHandler = async (req, res) => {
    const { productId, size, quantitySold } = req.body;
  
    try {
      const result = await sellProduct(productId, size, quantitySold);
      res.status(200).json({ message: result });
    } catch (error) {
      console.error('Error al vender el producto:', error);
      res.status(500).json({ error: 'Error al vender el producto.' });
    }
  };

module.exports = {
  addStockToProductHandler,
  sellProductHandler,
};