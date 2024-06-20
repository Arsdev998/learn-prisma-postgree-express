const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
app.use(cors({
  origin: process.env.FRONTEND_URL, // Ganti dengan URL front-end Anda
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


const productController = require("./controll/product/product.controller.js");
const auth = require("./controll/users/users.controller.js");
const google = require("./controll/google/google.js");

app.use("/", google);
app.use("/products", productController);
app.use("/auth", auth);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Express API Running in Port :", +PORT);
});
