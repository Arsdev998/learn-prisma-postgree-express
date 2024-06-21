// src/controll/comment/comment.services.js
const { findCommentsByWisataId, createComment, deleteComment } = require("./comment.repository.js");

const getCommentsByWisataId = async (wisataId) => {
  return await findCommentsByWisataId(wisataId);
};

const addComment = async (commentData) => {
  return await createComment(commentData);
};

const removeComment = async (id) => {
  return await deleteComment(id);
};

module.exports = {
  getCommentsByWisataId,
  addComment,
  removeComment,
};
