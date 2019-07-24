import {findChampionById, findWithPagination} from "../controllers/championController";

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const champions = await findWithPagination(req);
    res.status(200).json(champions);
});

router.get("/:championId", async (req, res) => {
    try {
        const champion = await findChampionById(req);
        res.status(200).json(champion);
    } catch ({message}) {
        switch (message) {
            default:
            case "bad_request":
                res.status(400).send({error: message});
                break;
            case "champion_not_found":
                res.status(404).send({error: message});
                break;
        }
    }
});

module.exports = router;
