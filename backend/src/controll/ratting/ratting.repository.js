const prisma = require("../../db/index.js");

const findRatingsByWisataId = async (wisataId) => {
  const ratings = await prisma.rating.findMany({
    where: { wisataId },
    include: {
      user: true,
    },
  });
  return ratings;
};

const createRating = async (ratingData) => {
  const rating = await prisma.rating.create({
    data: ratingData,
  });
  return rating;
};

const deleteRating = async (id) => {
  await prisma.rating.delete({
    where: { id },
  });
};

module.exports = {
  findRatingsByWisataId,
  createRating,
  deleteRating,
};
