const { Router } = require("express");

const {
  getAllProductsHandler,
  createProductsHandler,
  getBrandsHandler,
  getProductByIdHandler,
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

routeProducts.get("/detail/:id", getProductByIdHandler); //✅

routeProducts.post("/", createProductsHandler); //✅

routeProducts.get("/search", searchBarHandler); //✅

routeProducts.post("/addstock", addStockToProductHandler); //✅

routeProducts.post("/sell", sellProductHandler); //✅

//Obtener lista de marcas
routeProducts.get("/brands", getBrandsHandler);

module.exports = {
  routeProducts,
};
