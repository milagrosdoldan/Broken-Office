const express = require("express");
const http = require("http")
const app = express();
const routes = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const socketio = require("socket.io")
// conexion a db, cluster
const client = require("./db");
const cookieparser = require("cookie-parser");
//enviroment
require("dotenv").config();

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

const server = http.createServer(app)
const io = socketio(server)

io.on("connection", (socket)=>{
  console.log(`User conected ${socket.id}`)
})

server.listen(process.env.PORT, () => {
  console.log("api working!...");
});

module.exports = server