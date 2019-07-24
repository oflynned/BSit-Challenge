import { createRecord, deleteRecord, deleteRecords, getRecords, modifyRecord } from "../common/record";
import { ObjectId } from "mongodb";

const Joi = require("joi");
const logger = require("../config/winston");
const namespace = "api.common.models.baseRecord";

class BaseRecord {
  constructor (collection, schema) {
    this._collection = collection;
    this._schema = schema;
  }

  get collection () {
    return this._collection;
  }

  get schema () {
    return this._schema;
  }

  static async validate (data, schema) {
    return new Promise((resolve, reject) => {
      let result = Joi.validate(data, schema, { stripUnknown: true });
      result["error"] === null ? resolve(result.value) : reject(result.error);
    });
  }

  static async modify (id, properties = {}, collection, updatableSchema) {
    await BaseRecord.validate(properties, updatableSchema);
    return modifyRecord(collection, properties, id);
  }

  static async destroy (collection, id) {
    return deleteRecord(collection, id);
  }

  static async destroyMany (criteria, collection) {
    return deleteRecords(collection, criteria);
  }

  static async find (collection, query = {}, limit = 10, offset = 0) {
    if (!collection) {
      logger.warn(`${namespace}#find: empty collection passed - query: (${query})`);
      throw new Error("blank_collection");
    }

    return getRecords(collection, query, Number(limit), Number(offset));
  }

  static async findById (collection, id, hiddenFields = {}) {
    if (!collection) {
      logger.warn(`${namespace}#findById: empty collection passed - id (${id})`);
      throw new Error("blank_collection");
    }
    return getRecords(collection, { _id: BaseRecord.oid(id) }, hiddenFields);
  }

  static oid (id) {
    return id ? ObjectId(id) : ObjectId();
  }

  async save (data) {
    const payload = Object.assign({}, data, { createdAt: Date.now(), updatedAt: null });
    const record = await BaseRecord.validate(payload, this.schema);
    return createRecord(this.collection, record);
  }
}

export default BaseRecord;
