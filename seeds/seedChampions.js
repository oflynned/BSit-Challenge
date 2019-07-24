import Champion from "../models/champion/champion";
import { fetchDataset } from "../common/fileLoader";

const logger = require("../config/winston");
const namespace = "api.seeds.seedChampions";

export const seedChampions = async () => {
  await Champion.destroyMany({}, "seedChampions");
  const champions = await Champion.find();
  if (champions.length > 0) {
    logger.info(`${namespace}: champion list has already been seeded`);
    return;
  }

  for (let item of fetchDataset()) {
    await new Champion(item).save();
  }

  logger.info(`${namespace}: seeded champions from the master list`);
};
