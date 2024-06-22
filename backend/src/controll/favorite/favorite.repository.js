const prisma = require("../../db/index.js");

const addFavorite = async (userId, wisataId) => {
  const userIdInt = parseInt(userId, 10);
  const wisataIdInt = parseInt(wisataId, 10);

  // Periksa apakah wisata dengan ID yang diberikan ada
  const wisataExists = await prisma.wisata.findUnique({
    where: {
      id: wisataIdInt,
    },
  });

  if (!wisataExists) {
    throw new Error("Wisata dengan ID tersebut tidak ditemukan");
  }

  // Periksa apakah favorit sudah ada
  const favoriteExists = await prisma.favorite.findUnique({
    where: {
      userId_wisataId: {
        userId: userIdInt,
        wisataId: wisataIdInt,
      },
    },
  });

  if (favoriteExists) {
    throw new Error("Favorite sudah ada");
  }

  // Tambahkan favorit
  const favorite = await prisma.favorite.create({
    data: {
      userId: userIdInt,
      wisataId: wisataIdInt,
    },
  });

  return favorite;
};

const getFavoritesByUserId = async (userId) => {
  const userIdInt = parseInt(userId, 10);
  
  const favorites = await prisma.favorite.findMany({
    where: {
      userId: userIdInt,
    },
    include: {
      wisata: true, // Sertakan data wisata dalam hasil
    },
  });

  return favorites;
};

const deleteFavorite = async (userId, wisataId) => {
  const userIdInt = parseInt(userId, 10);
  const wisataIdInt = parseInt(wisataId, 10);

  // Periksa apakah favorit ada
  const favorite = await prisma.favorite.findUnique({
    where: {
      userId_wisataId: {
        userId: userIdInt,
        wisataId: wisataIdInt,
      },
    },
  });

  if (!favorite) {
    throw new Error("Favorite tidak ditemukan");
  }

  await prisma.favorite.delete({
    where: {
      userId_wisataId: {
        userId: userIdInt,
        wisataId: wisataIdInt,
      },
    },
  });
};

module.exports = {
  addFavorite,
  getFavoritesByUserId,
  deleteFavorite,
};
