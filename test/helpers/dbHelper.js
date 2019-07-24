import { db } from "../../common/record";
import { collections } from "../../config/environments";

export const dropDb = async () => Promise.all(collections.map(col => db.get(col).drop()));
