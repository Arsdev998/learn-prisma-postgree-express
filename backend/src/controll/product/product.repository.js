//berkomunikasi dengan database
//boleh pakai ORM atau rawQuery
const prisma = require("../../db/index.js");

const findProducts = async () => {
  const product = await prisma.product.findMany();
  return product;
};

module.exports = {
  findProducts,
};
