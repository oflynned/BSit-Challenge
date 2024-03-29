let record = require("../../common/record");

const config = require("../../config/db");
const db = require("monk")(config.mongoUrl);
const collection = "collection";

describe("db operations", () => {
  beforeEach((done) => {
    dropDb().then(() => done());
  });

  function dropDb () {
    return db.get(collection).drop();
  }

  describe("#createRecord", () => {
    [undefined, null, ""].forEach((fixture) => {
      test(`should not allow ${fixture} as a collection name`, (done) => {
        record.createRecord(fixture, { test: 123 })
          .then(() => done("should have failed"))
          .catch((err) => {
            expect(err.message).toBe("empty_collection");
            done();
          });
      });
    });

    [undefined, null, ""].forEach((fixture) => {
      test(`should not allow ${fixture} as data`, (done) => {
        record.createRecord(collection, fixture)
          .then(() => done("should have failed"))
          .catch((err) => {
            expect(err.message).toBe("empty_data");
            done();
          });
      });
    });

    test("should create a new record", (done) => {
      record.createRecord(collection, { test: 123 })
        .then((data) => {
          expect(typeof data).toBe("object");
          expect(data).toHaveProperty("_id");
          expect(data).toHaveProperty("test");
          expect(data.test).toBe(123);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe("#getRecords", () => {
    beforeEach((done) => {
      record.createRecord(collection, { test: 123 })
        .then(() => done());
    });

    test("should retrieve with filter", (done) => {
      record.getRecords(collection, { test: 123 })
        .then((data) => {
          expect(Array.isArray(data)).toBe(true);
          expect(data.length).toBe(1);
          expect(data[0]).toHaveProperty("_id");
          expect(data[0]).toHaveProperty("test");
          done();
        })
        .catch((err) => done(err));
    });

    test("should retrieve without filter", (done) => {
      record.getRecords(collection, {})
        .then((data) => {
          expect(Array.isArray(data)).toBe(true);
          expect(data.length).toBe(1);
          expect(data[0]).toHaveProperty("_id");
          expect(data[0]).toHaveProperty("test");
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe("#modifyRecord", () => {
    let data;

    beforeEach(async done => {
      data = await record.createRecord(collection, { modifiedField: "old", nonModifiedField: "old" });
      done();
    });

    test("should modify record", async done => {
      const modifiedItem = await record.modifyRecord(collection, { modifiedField: "new" }, data._id);
      expect(typeof modifiedItem).toBe("object");
      expect(modifiedItem).toHaveProperty("_id");
      expect(modifiedItem).toHaveProperty("modifiedField");
      expect(modifiedItem).toHaveProperty("nonModifiedField");
      expect(modifiedItem._id).toEqual(data._id);
      expect(modifiedItem.modifiedField).toBe("new");
      expect(modifiedItem.nonModifiedField).toBe("old");
      done();
    });
  });

  describe("#deleteRecord", () => {
    let id;

    beforeEach((done) => {
      record.createRecord(collection, { test: 123 })
        .then(({ _id }) => {
          id = _id;
        })
        .then(() => done());
    });

    test("should delete record", (done) => {
      record.deleteRecord(collection, id)
        .then(() => record.getRecords(collection, {}))
        .then((data) => {
          expect(data.length).toBe(0);
          done();
        })
        .catch((err) => done(err));
    });
  });
});
