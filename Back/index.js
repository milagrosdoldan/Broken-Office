const express = require("express");
const app = express();
// const routes = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
// conexion a db, cluster
const client = require("./db");
const cookieparser = require("cookie-parser");
//enviroment
require("dotenv").config();

//middelware

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));
// app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log("api working!...");
});
