const { Router } = require('express');
const { getAllProductsHandler, createProductsHandler, filterByPriceHandler, filterByAlphabeticallyHandler, filterByGenreHandler, filterByTypeHandler, filterByBrandHandler } = require("../Handlers/productsHadlers")
const { searchBarHandler } = require("../Handlers/searchBarHandler")

routeProducts = Router();


routeProducts.get("/", getAllProductsHandler) 

routeProducts.post("/", createProductsHandler) //funciona



routeProducts.get("/price/:orderType", filterByPriceHandler) 

routeProducts.get("/type/:filterByType", filterByTypeHandler)  

routeProducts.get("/brand/:filterByBrand", filterByBrandHandler) 

routeProducts.get("/alphabetically/:orderAlphabetically", filterByAlphabeticallyHandler) 

routeProducts.get("/genre/:typeGenre",filterByGenreHandler ) //funciona

routeProducts.get("/search" , searchBarHandler)

module.exports = {
    routeProducts
}