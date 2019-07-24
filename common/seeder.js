import { seedChampions } from "../seeds/seedChampions";

export const seedDb = async () => {
  await seedChampions();
};
