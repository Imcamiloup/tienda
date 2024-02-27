const { Router } = require('express');
const { getAllUsersHandler, createUsersHandler, changeEmailHandler, deleteUsersHandler } = require("../Handlers/usersHandlers")
routeUsers = Router();

routeUsers.get("/", getAllUsersHandler) 

routeUsers.post("/", createUsersHandler)

routeUsers.put("/:userId", changeEmailHandler)

routeUsers.delete("/:userId", deleteUsersHandler)


module.exports = {
    routeUsers
}