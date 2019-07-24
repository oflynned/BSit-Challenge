import BaseRecord from "../baseRecord";
import Schema from "./schema";
import Sprite from "./sprite/sprite";
import Stats from "./stats/stats";

const collection = "champions";

class Champion extends BaseRecord {
  constructor ({ id, key, name, title, tags, stats, icon, sprite, description }) {
    super(collection, Schema);
    this._id = id;
    this._tags = tags;
    this._key = key;
    this._name = name;
    this._title = title;
    this._icon = icon;
    this._sprite = new Sprite(sprite);
    this._stats = new Stats(stats);
    this._description = description;
  }

  get id () {
    return this._id;
  }

  get key () {
    return this._key;
  }

  get name () {
    return this._name;
  }

  get title () {
    return this._title;
  }

  get tags () {
    return this._tags;
  }

  get icon () {
    return this._icon;
  }

  get sprite () {
    return this._sprite;
  }

  get stats () {
    return this._stats;
  }

  get description () {
    return this._description;
  }

  static async find (query = {}) {
    return BaseRecord.find(collection, query, -1, -1);
  }

  static async findWithPagination (query = {}, limit = 10, offset = 0) {
    return BaseRecord.find(collection, query, limit, offset);
  }

  static async findById (championId) {
    return BaseRecord.find(collection, { id: championId });
  }

  static async deleteMany () {
    return BaseRecord.destroyMany({}, collection);
  }

  async save () {
    return super.save(this.toJSON());
  }

  toJSON () {
    return {
      id: this._id,
      tags: this._tags,
      key: this._key,
      name: this._name,
      title: this._title,
      icon: this._icon,
      description: this._description,
      sprite: this._sprite.toJSON(),
      stats: this._stats.toJSON()
    };
  }
}

export default Champion;
