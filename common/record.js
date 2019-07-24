const config = require("../config/db");
const ObjectId = require("mongodb").ObjectId;
export const db = require("monk")(config.mongoUrl);

const logger = require("../config/winston");
const namespace = "api.common.record";

export const createRecord = async (collection, data) => {
    if (!collection) {
        logger.error(`${namespace}#createRecord: empty collection passed`);
        throw new Error("empty_collection");
    }

    if (!data) {
        // got past validations - raise the alarm
        logger.error(`${namespace}#createRecord: empty data payload passed`);
        throw new Error("empty_data");
    }
    const record = Object.assign({}, {createdAt: Date.now(), updatedAt: null}, data);
    return db.get(collection).insert(record);
};

export const getRecordById = async (collection, id, hiddenFields) =>
    db.get(collection).findOne({_id: ObjectId(id)}, hiddenFields);

// TODO is there a better way? what is the default for unlimited offset and limit? ie is -1 the value for unlimited?
export const getRecords = async (collection, filter, limit, offset) =>
    db.get(collection).find(filter, (limit === -1 || offset === -1) ? {} : {skip: offset, limit});

export const modifyRecord = async (collection, data, id) => {
    const record = await db.get(collection).findOne({_id: ObjectId(id)});
    await db.get(collection).update(
        {_id: ObjectId(id)},
        {
            "$set": Object.assign({}, record, data,
                {createdAt: record.createdAt, updatedAt: Date.now()})
        });
    return db.get(collection).findOne({_id: ObjectId(id)});
};

export const deleteRecord = async (collection, id) =>
    db.get(collection).remove({_id: ObjectId(id)});

export const deleteRecords = async (collection, filter) =>
    db.get(collection).remove(filter, {multi: true});
