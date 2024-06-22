// src/controll/comment/comment.repository.js
const prisma = require("../../db/index.js");

const findCommentsByWisataId = async (wisataId) => {
  const comments = await prisma.comment.findMany({
    where: { wisataId: wisataId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          profilePic: true,
        },
      },
    },
  });
  return comments;
};

const createComment = async (commentData) => {
  const comment = await prisma.comment.create({
    data: {
      content: commentData.content,
      wisataId: commentData.wisataId,
      userId: commentData.userId, // Menghubungkan komentar dengan pengguna yang membuatnya
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          profilePic: true,
        },
      }, // Sertakan data pengguna dalam hasil
    },
  });
  return comment;
};

const updateComment = async (id, commentData) => {
  return await prisma.comment.update({
    where: { id: id },
    data: {
      content: commentData.content,
    },
  });
};


const deleteComment = async (id) => {
  const comment = await prisma.comment.findUnique({
    where: { id: id },
  });

  if (!comment) {
    throw new Error("Comment not found");
  }

  await prisma.comment.delete({
    where: { id: id },
  });
};

const findCommentById = async (id) => {
  const comment = await prisma.comment.findUnique({
    where: { id: id },
    include: { user: {

      select:{
        id:true,
        name:true,
        email:true,
        profilePic:true
      }
    } },
  });
  return comment;
};

module.exports = {
  findCommentsByWisataId,
  createComment,
  deleteComment,
  updateComment,
  findCommentById,
};
