const {
    findRatingsByWisataId,
    createRating,
    deleteRating,
  } = require("./ratting.repository.js");
  
  const getRatingsByWisataId = async (wisataId) => {
    return await findRatingsByWisataId(wisataId);
  };
  
  const addRating = async (ratingData) => {
    return await createRating(ratingData);
  };
  
  const removeRating = async (id) => {
    return await deleteRating(id);
  };
  const removeComment = async (id) => {
    return await deleteComment(id);
  };
  
  module.exports = {
    getRatingsByWisataId,
    addRating,
    removeRating,
    removeComment
  };
  