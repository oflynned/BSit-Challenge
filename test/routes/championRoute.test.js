import { dropDb } from "../helpers/dbHelper";
import { getResource } from "../helpers/requestHelper";
import { seedChampions } from "../../seeds/seedChampions";

const chai = require("chai");
const chaiHttp = require("chai-http");

let app;
const url = "/api/champions";
const championId = "aatrox";

describe(`${url} endpoint`, () => {
  beforeAll(async () => {
    await dropDb();
    await seedChampions();
    app = require("../../app");
    chai.use(chaiHttp);
  });

  afterAll(async () => dropDb());

  describe("GET", () => {
    describe("/", () => {
      describe("should return 200", () => {
        test("when accessing the bare endpoint", async done => {
          const { body, status } = await getResource(app, url);
          expect(status).toEqual(200);
          expect(Array.isArray(body)).toBe(true);
          done();
        });

        test("when accessing with a query parameter", async done => {
          const { body, status } = await getResource(app, `${url}?limit=10&offset=0`);
          expect(status).toEqual(200);
          expect(Array.isArray(body)).toBe(true);
          done();
        });
      });
      describe("should return 400", () => {
        test("when passing < -1 for limit", async done => {
          try {
            await getResource(app, url + "?limit=-10&offset=0");
            done("did not throw http 400");
          } catch ({ response }) {
            expect(response.status).toEqual(400);
            expect(response.body.error).toEqual("bad_query_parameter");
            done();
          }
        });

        test("when passing < -1 for offset", async done => {
          try {
            await getResource(app, url + "?limit=10&offset=-10");
            done("did not throw http 400");
          } catch ({ response }) {
            expect(response.status).toEqual(400);
            expect(response.body.error).toEqual("bad_query_parameter");
            done();
          }
        });
      });
    });
  });
});
describe("/:championId", () => {
  describe("should return 200", () => {
    test("when accessing an existing champion", async done => {
      const { body, status } = await getResource(app, url + "/" + championId);
      expect(status).toEqual(200);
      expect(Array.isArray(body)).toBe(false);
      expect(body.hasOwnProperty("name")).toBe(true);
      expect(body.id).toEqual(championId);
      done();
    });
  });

  describe("should return 404", () => {
    test("when accessing a non-existent champion", async done => {
      try {
        await getResource(app, url + "/does-not-exist");
        done("did not throw http 404");
      } catch ({ response }) {
        expect(response.status).toEqual(404);
        expect(response.body.error).toEqual("champion_not_found");
        done();
      }
    });
  });
});
