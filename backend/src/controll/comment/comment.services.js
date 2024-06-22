// src/controll/comment/comment.services.js
const { findCommentsByWisataId, createComment, deleteComment, findCommentById, updateComment } = require("./comment.repository.js");

const getCommentsByWisataId = async (wisataId) => {
  return await findCommentsByWisataId(wisataId);
};

const addComment = async (commentData) => {
  return await createComment(commentData);
};

const editComment = async (id, commentData, userId, userRole) => {
  const comment = await findCommentById(id);

  if (!comment) {
    throw new Error('Comment not found');
  }

  if (comment.userId !== userId && userRole !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  return await updateComment(id, commentData);
};

const removeComment = async (id, userId, userRole) => {
  const comment = await findCommentById(id);

  if (comment.userId !== userId && userRole !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  await deleteComment(id);
};

module.exports = {
  getCommentsByWisataId,
  addComment,
  removeComment,
  editComment
};
