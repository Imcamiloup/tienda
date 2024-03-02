const { Router } = require("express");

const {
  getAllProductsHandler,
  createProductsHandler,
  getBrandsHandler,
} = require("../Handlers/productsHadlers");

const { searchBarHandler } = require("../Handlers/searchBarHandler");

const {
  addStockToProductHandler,
  sellProductHandler,
} = require("../Handlers/stockHandlers");

//Probando filtro y orden
const filterAndOrderHandler = require("../Propuesta/productosFiltadosyOrdenados");
//--------------------------------------------------

routeProducts = Router();

routeProducts.get("/", getAllProductsHandler); //✅

routeProducts.post("/", createProductsHandler); //✅

// routeProducts.get("/price/:orderType", filterByPriceHandler); //✅

// routeProducts.get("/type/:filterByType", filterByTypeHandler); //✅

// routeProducts.get("/brand/:filterByBrand", filterByBrandHandler); //✅

// routeProducts.get(
//   "/alphabetically/:orderAlphabetically",
//   filterByAlphabeticallyHandler
// ); //✅

// routeProducts.get("/genre/:typeGenre", filterByGenreHandler); //✅

routeProducts.get("/search", searchBarHandler); //✅

routeProducts.post("/addstock", addStockToProductHandler); //✅

routeProducts.post("/sell", sellProductHandler); //✅

//Obtener lista de marcas
routeProducts.get("/brands", getBrandsHandler);

module.exports = {
  routeProducts,
};
