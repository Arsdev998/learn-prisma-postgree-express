const prisma = require("../../db/index.js");

const findFavoritesByUserId = async (userId) => {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: {
      wisata: true,
    },
  });
  return favorites;
};

const createFavorite = async (favoriteData) => {
  const favorite = await prisma.favorite.create({
    data: favoriteData,
  });
  return favorite;
};

const deleteFavorite = async (id) => {
  await prisma.favorite.delete({
    where: { id },
  });
};

module.exports = {
  findFavoritesByUserId,
  createFavorite,
  deleteFavorite,
};
