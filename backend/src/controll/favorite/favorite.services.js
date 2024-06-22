const { addFavorite, getFavoritesByUserId, deleteFavorite } = require("./favorite.repository");

const addFavoriteService = async (userId, wisataId) => {
  try {
    return await addFavorite(userId, wisataId);
  } catch (error) {
    throw new Error(`Gagal menambahkan favorit: ${error.message}`);
  }
};

const getFavoritesService = async (userId) => {
  try {
    return await getFavoritesByUserId(userId);
  } catch (error) {
    throw new Error(`Gagal mendapatkan favorit: ${error.message}`);
  }
};

const deleteFavoriteService = async (userId, wisataId) => {
  try {
    await deleteFavorite(userId, wisataId);
    return { message: "Favorite berhasil dihapus" };
  } catch (error) {
    throw new Error(`Gagal menghapus favorit: ${error.message}`);
  }
};

module.exports = {
  addFavoriteService,
  getFavoritesService,
  deleteFavoriteService,
};
