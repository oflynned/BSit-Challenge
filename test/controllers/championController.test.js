import { dropDb } from "../helpers/dbHelper";
import { seedChampions } from "../../seeds/seedChampions";
import { findChampionById, findWithPagination } from "../../controllers/championController";

const championId = "aatrox";

describe("championsController", () => {
  beforeAll(async () => {
    await dropDb();
    await seedChampions();
  });

  afterAll(async () => dropDb());

  describe("#findWithPagination", () => {
    describe(".limit", () => {
      test("should default to 10", async done => {
        const champions = await findWithPagination({ query: {} });
        expect(champions.length).toEqual(10);
        done();
      });

      test("should limit results", async done => {
        const champions = await findWithPagination({ query: { limit: 1 } });
        expect(champions.length).toEqual(1);
        done();
      });

      test("should throw bad_query_parameter on a bad value", async done => {
        try {
          await findWithPagination({ query: { limit: -10 } });
          done("did not throw bad_query_parameter");
        } catch ({ message }) {
          done();
        }
      });
    });

    describe(".offset", () => {
      test("should default to 0", async done => {
        const champions = await findWithPagination({ query: {} });
        expect(champions.length).toEqual(10);
        expect(champions[0].id).toEqual("aatrox");
        done();
      });

      test("should offset results", async done => {
        const champions = await findWithPagination({ query: { offset: 1 } });
        expect(champions.length).toEqual(10);
        expect(champions[0].id).toEqual("ahri");
        done();
      });

      test("should throw bad_query_parameter on a bad value", async done => {
        try {
          await findWithPagination({ query: { offset: -10 } });
          done("did not throw bad_query_parameter");
        } catch ({ message }) {
          done();
        }
      });
    });
  });

  describe("#findChampionById", () => {
    test("should return champion object", async done => {
      const champion = await findChampionById({ params: { championId } });
      expect(Array.isArray(champion)).toBe(false);
      expect(champion.id).toEqual(championId);
      done();
    });

    test("should throw bad request", async done => {
      try {
        await findChampionById({ params: { championId: null } });
        done("did not throw bad_request");
      } catch ({ message }) {
        expect(message).toEqual("bad_request");
        done();
      }
    });

    test("should throw champion not found", async done => {
      try {
        await findChampionById({ params: { championId: "does-not-exist" } });
        done("did not throw champion_not_found");
      } catch ({ message }) {
        expect(message).toEqual("champion_not_found");
        done();
      }
    });
  });
});
