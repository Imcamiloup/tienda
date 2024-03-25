const express = require("express");
const { routePrincipal } = require("./Routes/Routes");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();

//Manejo de Origenes----------------------------------------
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
//---------------------------------------------------------

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/", routePrincipal);

module.exports = {
  app,
};
