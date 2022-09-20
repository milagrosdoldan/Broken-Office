const express = require("express");
const http = require("http");
const app = express();
const routes = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const socketio = require("socket.io");
const client = require("./db");
const cookieparser = require("cookie-parser");
const path = require("path");
//enviroment
require("dotenv").config();
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Broken Office Globant",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

//middelware
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.use(
  "/api-doc",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log("api working!...");
});
