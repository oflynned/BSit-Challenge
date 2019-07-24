import {dropDb} from "../helpers/dbHelper";
import {seedChampions} from "../../seeds/seedChampions";
import Champion from "../../models/champion/champion";

require("dotenv");

describe("champion seeding", () => {
    describe("#champion", () => {
        beforeEach(async () => dropDb());

        afterEach(async () => dropDb());

        test("should seed seedChampions if none exist", async done => {
            await seedChampions();
            const accounts = await Champion.find();
            expect(accounts.length > 0).toBe(true);
            done();
        });

        test("should not seed seedChampions if seed job was already run", async done => {
            await seedChampions();
            const seededChampions = await Champion.find();
            await seedChampions();
            const reseededChampions = await Champion.find();

            expect(seededChampions.length).toEqual(reseededChampions.length);
            done();
        });
    });
});
