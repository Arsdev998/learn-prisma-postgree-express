const prisma = require("../../db/index.js");

const addRating = async (userId, wisataId, value) => {
  return await prisma.rating.create({
    data: { userId, wisataId, value },
  });
};

const findRatingByUserAndWisata = async (userId, wisataId) => {
  return await prisma.rating.findFirst({
    where: { userId, wisataId },
  });
};

const findRatingsByWisataId = async (wisataId) => {
  return await prisma.rating.findMany({
    where: { wisataId },
  });
};

const findRatingById = async (id) => {
  return await prisma.rating.findUnique({
    where: { id },
  });
};

const deleteRatingById = async (id) => {
  return await prisma.rating.delete({
    where: { id },
  });
};

const updateRatingById = async (id, value) => {
  return await prisma.rating.update({
    where: { id },
    data: { value },
  });
};

module.exports = {
  addRating,
  findRatingByUserAndWisata,
  findRatingsByWisataId,
  findRatingById,
  deleteRatingById,
  updateRatingById,
};
