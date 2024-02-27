const { Router } = require('express');
const { getAllProductsHandler,
         createProductsHandler, 
         filterByPriceHandler, 
         filterByAlphabeticallyHandler, 
         filterByGenreHandler, 
         filterByTypeHandler, 
         filterByBrandHandler,
         changePriceHandler  } = require("../Handlers/productsHadlers")


routeProducts = Router();


routeProducts.get("/", getAllProductsHandler) 

routeProducts.post("/", createProductsHandler) 

routeProducts.put("/:productId", changePriceHandler) // no se si esta bien el nombre de la funcion ChangePriceHandler(

routeProducts.get("/price/:orderType", filterByPriceHandler) 

routeProducts.get("/type/:filterByType", filterByTypeHandler)  

routeProducts.get("/brand/:filterByBrand", filterByBrandHandler) 

routeProducts.get("/alphabetically/:orderAlphabetically", filterByAlphabeticallyHandler) 

routeProducts.get("/genre/:typeGenre",filterByGenreHandler ) 




module.exports = {
    routeProducts
}