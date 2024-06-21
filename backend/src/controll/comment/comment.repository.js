// src/controll/comment/comment.repository.js
const prisma = require("../../db/index.js");

const findCommentsByWisataId = async (wisataId) => {
  const comments = await prisma.comment.findMany({
    where: { wisataId: wisataId },
    include: { user: true },
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
      user: true, // Sertakan data pengguna dalam hasil
    },
  });
  return comment;
};

const deleteComment = async (id) => {
  // Cek apakah komentar ada sebelum menghapus
  const comment = await prisma.comment.findUnique({
    where: { id: id }
  });

  if (!comment) {
    throw new Error('Comment not found');
  }

  await prisma.comment.delete({
    where: { id: id }
  });
};

module.exports = {
  findCommentsByWisataId,
  createComment,
  deleteComment,
};
