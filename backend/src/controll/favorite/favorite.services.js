const {
    findFavoritesByUserId,
    createFavorite,
    deleteFavorite,
  } = require("./favorite.repository.js");
  
  const getFavoritesByUserId = async (userId) => {
    return await findFavoritesByUserId(userId);
  };
  
  const addFavorite = async (favoriteData) => {
    return await createFavorite(favoriteData);
  };
  
  const removeFavorite = async (id) => {
    return await deleteFavorite(id);
  };
  
  module.exports = {
    getFavoritesByUserId,
    addFavorite,
    removeFavorite,
  };
  