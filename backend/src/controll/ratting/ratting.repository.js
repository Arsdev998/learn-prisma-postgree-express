// src/controll/rating/rating.repository.js
const prisma = require("../../db/index.js");

const findRatingsByWisataId = async (wisataId) => {
  const ratings = await prisma.rating.findMany({
    where: { wisataId: wisataId },
    include: { user: true },
  });
  return ratings;
};

const createRating = async (ratingData) => {
  const rating = await prisma.rating.create({
    data: {
      value: ratingData.value,
      wisataId: ratingData.wisataId,
      userId: ratingData.userId, // Menghubungkan rating dengan pengguna yang membuatnya
    },
    include: {
      user: true, // Sertakan data pengguna dalam hasil
    },
  });
  return rating;
};

const updateRating = async (id, ratingData) => {
  const rating = await prisma.rating.update({
    where: { id: id },
    data: {
      value: ratingData.value,
    },
  });
  return rating;
};

const deleteRating = async (id) => {
  const rating = await prisma.rating.findUnique({
    where: { id: id },
  });

  if (!rating) {
    throw new Error("Rating not found");
  }

  await prisma.rating.delete({
    where: { id: id },
  });
};

const findRatingById = async (id) => {
  const rating = await prisma.rating.findUnique({
    where: { id: id },
    include: { user: true },
  });
  return rating;
};

module.exports = {
  findRatingsByWisataId,
  createRating,
  updateRating,
  deleteRating,
  findRatingById
};
