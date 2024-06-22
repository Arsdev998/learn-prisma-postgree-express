// src/controll/comment/comment.controller.js
const express = require("express");
const {
  getCommentsByWisataId,
  addComment,
  removeComment,
  editComment,
} = require("./comment.services.js");
const router = express.Router();
const { accessValidation } = require("../middleware/accesValidation.js");
const { findCommentById } = require("./comment.repository.js");

router.get("/:wisataId", async (req, res) => {
  try {
    const comments = await getCommentsByWisataId(parseInt(req.params.wisataId));
    res.send(comments);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch comments" });
  }
});

router.get("/by/:id", async (req, res) => {
  try {
    const commentId = parseInt(req.params.id);
    const comment = await findCommentById(commentId);
    if (!comment) {
      res.status(404).json({ message: "comment not found" });
    }
    res.send(comment);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch comment" });
  }
});

router.post("/:wisataId", accessValidation, async (req, res) => {
  try {
    const commentData = {
      ...req.body,
      wisataId: parseInt(req.params.wisataId),
      userId: req.userData.id, // Menambahkan userId dari token autentikasi
    };
    const comment = await addComment(commentData);
    res.status(201).send(comment);
  } catch (error) {
    res.status(400).send({ error: `Failed: ${error.message}` });
  }
});


router.put('/:id', accessValidation, async (req, res) => {
  try {
    const commentId = req.params.id;
    const commentData = req.body;
    const userId = req.userData.id;
    const userRole = req.userData.role;
    const comment = await editComment(parseInt(commentId), commentData, userId, userRole);
    res.send({ comment, message: 'Comment updated successfully' });
  } catch (error) {
    res.status(400).send({ error: `Failed: ${error.message}` });
  }
});

router.delete("/:id", accessValidation, async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.userData.id;
    const userRole = req.userData.role;
    await removeComment(parseInt(commentId), userId, userRole);
    res.send({ message: "Comment deleted" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
