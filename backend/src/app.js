const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("./database/index");
const controllers = require("../src/controllers");
const bodyParser = require("body-parser");
const app = express();

//middlewares
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.post("/register", controllers.register);
app.post("/login", controllers.login);
app.get("/profile/:name", controllers.profile);


//port settings)
const PORT = process.env.PORT || 4000;

//starting server
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
  database();
});
