const prisma = require("../../db/index.js");

const createUser = async (userData) => {
  return await prisma.user.create({
    data: userData,
  });
};

const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

const updateUserProfilePic = async (userId, profilePic) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { profilePic },
  });
};

const updateUserDetails = async (userId, userDetails) => {
  return await prisma.user.update({
    where: { id: userId },
    data: userDetails,
  });
};

const deleteUserById = async (id) => {
  return await prisma.user.delete({
    where: { id },
  });
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserProfilePic,
  updateUserDetails,
  deleteUserById,
};
