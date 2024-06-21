const prisma = require("../../db/index.js");

const findWisata = async () => {
  const wisata = await prisma.wisata.findMany();
  return wisata;
};

const findWisataById = async (id) => {
  const wisata = await prisma.wisata.findUnique({
    where: { id },
    include: {
      comments: true,
      favorites: true,
      ratings: true,
      images: true,
    },
  });
  return wisata;
};

module.exports = {
  findWisata,
  findWisataById,
};
