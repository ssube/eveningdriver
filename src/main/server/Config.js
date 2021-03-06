export default class Config {
  static loadFrom(path) {
    const data = require(path);
    return new Config(data);
  }

  constructor(data) {
    this._data = data;
  }

  get event() {
    return this._data.event;
  }

  get log() {
    return this._data.log;
  }

  get redis() {
    return this._data.redis;
  }

  get schedule() {
    return this._data.schedule;
  }

  get server() {
    return this._data.server;
  }

  get shared() {
    return this._data.shared;
  }

  get statsd() {
    return this._data.statsd;
  }

  get transform() {
    return this._data.transform;
  }

  get worker() {
    return this._data.worker;
  }
}
