const {
  addRating,
  findRatingByUserAndWisata,
  findRatingsByWisataId,
  findRatingById,
  deleteRatingById,
  updateRatingById,
} = require("./ratting.repository");

const createRating = async (userId, wisataId, value) => {
  const ratingExists = await findRatingByUserAndWisata(userId, wisataId);
  if (ratingExists) {
    throw new Error("Rating sudah ada untuk user dan wisata ini");
  }

  return await addRating(userId, wisataId, value);
};

const getRatingsForWisata = async (wisataId) => {
  return await findRatingsByWisataId(wisataId);
};

const removeRating = async (id, userId, userRole) => {
  const rating = await findRatingById(id);
  if (!rating) {
    throw new Error("Rating tidak ditemukan");
  }
  if (rating.userId !== userId && userRole !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  return await deleteRatingById(id);
};

const editRating = async (id, value, userId, userRole) => {
  const rating = await findRatingById(id);
  if (!rating) {
    throw new Error("Rating tidak ditemukan");
  }
  if (rating.userId !== userId && userRole !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  return await updateRatingById(id, value);
};

module.exports = {
  createRating,
  getRatingsForWisata,
  removeRating,
  editRating,
};
