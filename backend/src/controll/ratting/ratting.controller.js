const express = require("express");
const { getRatingsByWisataId, addRating, removeRating } = require("./ratting.services.js");
const router = express.Router();
const { accessValidation } = require("../middleware/accesValidation");

router.get("/:wisataId", async (req, res) => {
  try {
    const ratings = await getRatingsByWisataId(parseInt(req.params.wisataId));
    res.send(ratings);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch ratings" });
  }
});

router.post("/", accessValidation, async (req, res) => {
  try {
    const ratingData = req.body;
    const rating = await addRating(ratingData);
    res.status(201).send(rating);
  } catch (error) {
    res.status(400).send({ error: `Failed: ${error.message}` });
  }
});

router.delete("/:id", accessValidation, async (req, res) => {
  try {
    await removeRating(parseInt(req.params.id));
    res.send({ message: "Rating deleted" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;accessValidation