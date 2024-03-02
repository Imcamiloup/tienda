const { Product, Stocksize } = require("../db");

const addStockToProductController = async ({ productId, size, quantity }) => {
  try {
    // Verificar si el producto existe
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    // Verificar si ya existe una entrada de stock para este tamaño
    let stockEntry = await Stocksize.findOne({
      where: { ProductId: productId, size },
    });

    // Si no existe, crear una nueva entrada de stock
    if (!stockEntry) {
      stockEntry = await Stocksize.create({ size, quantity, ProductId: productId });
    }
     else {
     
      await stockEntry.increment('quantity',{by: quantity} )
    }

    return stockEntry;
  } catch (error) {
    throw new Error("Error adding stock to product: " + error.message);
  }
};

const sellProduct = async (productId, size, quantitySold) => {
    try {
      // Verificar si hay suficiente stock disponible
      const stock = await Stocksize.findOne({
        where: {
          ProductId: productId,
          size: size
        }
      });
  
      if (!stock || stock.quantity < quantitySold) {
        throw new Error('No hay suficiente stock disponible para esta venta.');
      }
  
     await stock.decrement('quantity',{by: quantitySold})
  
  
      return 'Venta realizada exitosamente. Stock actualizado.';
    } catch (error) {
      throw new Error('Error al vender el producto: ' + error.message);
    }
  };
  





module.exports = {
  addStockToProductController,
  sellProduct,
};
