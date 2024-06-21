// src/controll/comment/comment.controller.js
const express = require("express");
const { getCommentsByWisataId, addComment, removeComment } = require("./comment.services.js");
const router = express.Router();
const { accessValidation } = require("../middleware/accesValidation.js");

router.get("/:wisataId", async (req, res) => {
  try {
    const comments = await getCommentsByWisataId(parseInt(req.params.wisataId));
    res.send(comments);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch comments" });
  }
});

router.post("/:wisataId", accessValidation, async (req, res) => {
  try {
    const commentData = { 
      ...req.body, 
      wisataId: parseInt(req.params.wisataId),
      userId: req.userData.id // Menambahkan userId dari token autentikasi
    };
    const comment = await addComment(commentData);
    res.status(201).send(comment);
  } catch (error) {
    res.status(400).send({ error: `Failed: ${error.message}` });
  }
});

router.delete("/:id", accessValidation, async (req, res) => {
  try {
    const commentId = req.params.id;
    await removeComment(parseInt(commentId));
    res.send({ message: "Comment deleted" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
