const express = require("express");
const dotenv = require("dotenv");
const app = express();
app.use(express.json());

dotenv.config();

const productController = require("./product/product.controller.js");

app.use("/products", productController);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Express API Running in Port :", +PORT);
});
