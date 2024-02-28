const { Router } = require('express');

const { getAllProductsHandler, createProductsHandler, filterByPriceHandler, filterByAlphabeticallyHandler, filterByGenreHandler, filterByTypeHandler, filterByBrandHandler  } = require("../Handlers/productsHadlers")

const {searchBarHandler} = require('../Handlers/searchBarHandler')

const {addStockToProductHandler, sellProductHandler}= require ("../Handlers/stockHandlers")

routeProducts = Router();


routeProducts.get("/", getAllProductsHandler) //✅

routeProducts.post("/", createProductsHandler) //✅

routeProducts.get("/price/:orderType", filterByPriceHandler) //✅

routeProducts.get("/type/:filterByType", filterByTypeHandler)  //✅

routeProducts.get("/brand/:filterByBrand", filterByBrandHandler) //✅

routeProducts.get("/alphabetically/:orderAlphabetically", filterByAlphabeticallyHandler) //✅

routeProducts.get("/genre/:typeGenre",filterByGenreHandler ) //✅

routeProducts.get("/search" , searchBarHandler) //✅

routeProducts.post("/addstock", addStockToProductHandler); //✅

routeProducts.post("/sell", sellProductHandler) //✅

module.exports = {
    routeProducts
}