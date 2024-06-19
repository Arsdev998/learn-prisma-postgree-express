//services layer bertujuan untuk handle busines logic
// kenapa dipisah? Suapaya tanggung jawabnya ter-isolate, dan fungsinya reusable :)

const prisma = require("../db/index.js");
const { findProducts } = require("./product.repository.js");

const getAllProduct = async () => {
  const products = await findProducts()
  return products;
};

const getProductById = async (id) => {
  if (typeof id !== "number") {
    throw Error("Id is not number");
  }
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    throw Error("Product not found");
  }

  return product;
};
const createProducts = async (newProductdata) => {
  const product = await prisma.product.create({
    data: {
      name: newProductdata.name,
      description: newProductdata.description,
      image: newProductdata.image,
      price: newProductdata.price,
    },
  });
  return product;
};

const deleteProducts = async (id) => {
  await getProductById(id);
  await prisma.product.delete({
    where: {
      id,
    },
  });
};

const updateProducts = async (id, productData) => {
  await getProductById(id);
  const product = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      name: productData.name,
      description: productData.description,
      image: productData.image,
      price: productData.price,
    },
  });
  return product;
};


module.exports = {
  getAllProduct,
  getProductById,
  createProducts,
  deleteProducts,
  updateProducts,
};
