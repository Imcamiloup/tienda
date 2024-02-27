const { Router } = require('express');
const { getAllProductsHandler, createProductsHandler, filterByPriceHandler, filterByAlphabeticallyHandler, filterByGenreHandler, filterByTypeHandler, filterByBrandHandler  } = require("../Handlers/productsHadlers")


routeProducts = Router();


routeProducts.get("/", getAllProductsHandler)  //funciona

routeProducts.post("/", createProductsHandler) //funciona

routeProducts.get("/price/:orderType", filterByPriceHandler) //funciona

routeProducts.get("/type/:filterByType", filterByTypeHandler)  //No funciona

routeProducts.get("/brand/:filterByBrand", filterByBrandHandler) //No funciona

routeProducts.get("/alphabetically/:orderAlphabetically", filterByAlphabeticallyHandler) //funciona

routeProducts.get("/genre/:typeGenre",filterByGenreHandler ) //funciona


module.exports = {
    routeProducts
}