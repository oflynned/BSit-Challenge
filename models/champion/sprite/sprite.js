class Sprite {
  constructor ({ x, y, url }) {
    this._x = x;
    this._y = y;
    this._url = url;
  }

  get x () {
    return this._x;
  }

  get y () {
    return this._y;
  }

  get url () {
    return this._url;
  }

  toJSON () {
    return {
      x: this._x,
      y: this._y,
      url: this._url
    };
  }
}

export default Sprite;
