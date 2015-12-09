import bull from 'bull';
import bunyan from 'bunyan';
import Promise from 'bluebird';

const logger = bunyan.createLogger({name: 'Queue'});

export default class Queue {
  constructor({name, host, port}) {
    this._name = name;
    this._queue = bull(name, port, host);
  }

  get name() {
    return this._name;
  }

  listen(cb) {
    this._queue.process(cb);
  }

  close() {
    this._queue.close();
  }

  add(event) {
    return this._queue.add(event);
  }
}