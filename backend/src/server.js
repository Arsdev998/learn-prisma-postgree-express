const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(cookieParser())

dotenv.config();

const productController = require("./controll/product/product.controller.js");
const auth = require('./controll/users/users.controller.js')

app.use("/products", productController);
app.use("/auth", auth);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Express API Running in Port :", +PORT);
});
