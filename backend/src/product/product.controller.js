//layer handle req  dan res
// bisanya juga handle validasi body
const express = require("express");
const router = express.Router();
const prisma = require("../db/index.js");
const {
  getAllProduct,
  getProductById,
  createProducts,
  deleteProducts,
  updateProducts,
} = require("./product.services.js");

router.use(express.json());

router.get("/", async (req, res) => {
  const product = await getAllProduct();
  res.send(product);
});

router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductById(productId);
    res.send(product);
  } catch (error) {
    res.status(400).send("Product Not found");
  }
});

router.post("/", async (req, res) => {
  try {
    const newProductdata = req.body;
    const product = await createProducts(newProductdata);
    res.send(product);
  } catch (error) {
    res.status(400).send("failed :", error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    await deleteProducts(parseInt(productId));
    res.send("product deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    const product = await updateProducts(parseInt(productId), productData);
    res.send({ product, message: "product pacth success" });
  } catch (error) {
    throw error("failed");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    if (
      !(productData.name,
      productData.description,
      productData.price,
      productData.image)
    ) {
      res.status(400).send("fields is missing");
    }
    const product = await updateProducts(parseInt(productId), productData);
    res.send({ product, message: "product put success" });
  } catch (error) {
    throw error;
  }
});

module.exports = router;
