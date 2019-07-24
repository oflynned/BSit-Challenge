import { environments } from "../../config/environments";
import { getCollection, getEnvironment } from "../../config/collections";

describe("collections", () => {
  describe("#getEnvironment", () => {
    environments.forEach((env) => {
      test(`should return ${env} as legal environment`, () => {
        process.env = { ENVIRONMENT: env };
        expect(getEnvironment()).toBe(env);
      });
    });

    test("should default to development for illegal environment", () => {
      [undefined, null, "not an environment"].forEach((env) => {
        process.env = { ENVIRONMENT: env };
        expect(getEnvironment()).toBe("development");
      });
    });

    test("should default to development when environment doesn't exist", () => {
      process.env = undefined;
      expect(getEnvironment()).toBe("development");
    });
  });

  describe("#getCollection", () => {
    environments.forEach((env) => {
      test(`should classify ${env} as a legal environment`, () => {
        process.env = { ENVIRONMENT: env };
        let col = getCollection();
        expect(typeof col).toBe("object");
        expect(col).toHaveProperty("dbName");
        expect(col.dbName).toBe(env === "production" ? "bsit" : `bsit_${env}`);
      });
    });
  });
});
