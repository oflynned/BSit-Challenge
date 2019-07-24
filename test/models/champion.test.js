import { generateChampion, seedChampion } from "../../factories/championFactory";
import Champion from "../../models/champion/champion";

describe("#champion", () => {
  describe(".tags", () => {
    test("should require at least one tag", async done => {
      try {
        await seedChampion({ tags: [] });
        done("accepted bad attackspeedoffset");
      } catch ({ message }) {
        expect(message).toMatch(/does not contain 1 required value/);
        done();
      }
    });
  });

  describe(".stats", () => {
    describe(".attackspeedoffset", () => {
      test("should not be less than -1", async done => {
        try {
          const payload = await generateChampion();
          payload.stats.attackspeedoffset = -2;
          await new Champion(payload).save();
          done("accepted bad attackspeedoffset");
        } catch ({ message }) {
          expect(message).toMatch(/"attackspeedoffset" must be larger than or equal to -1]/);
          done();
        }
      });

      test("should not be greater than 1", async done => {
        try {
          const payload = await generateChampion();
          payload.stats.attackspeedoffset = 2;
          await new Champion(payload).save();
          done("accepted bad attackspeedoffset");
        } catch ({ message }) {
          expect(message).toMatch(/"attackspeedoffset" must be less than or equal to 1]/);
          done();
        }
      });
    });
  });
});
