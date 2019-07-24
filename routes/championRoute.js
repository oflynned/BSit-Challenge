import { findChampionById, findWithPagination } from "../controllers/championController";

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const champions = await findWithPagination(req);
    res.status(200).json(champions);
  } catch ({ message }) {
    res.status(400).json({ error: message });
  }
});

router.get("/:championId", async (req, res) => {
  try {
    const champion = await findChampionById(req);
    res.status(200).json(champion);
  } catch ({ message }) {
    switch (message) {
      default:
      case "bad_request":
        res.status(400).json({ error: message });
        break;
      case "champion_not_found":
        res.status(404).json({ error: message });
        break;
    }
  }
});

module.exports = router;
