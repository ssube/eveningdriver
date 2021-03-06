import bunyan from 'bunyan';
import express from 'express';

const logger = bunyan.createLogger({name: 'EventController'});

export default class Event {
  constructor(server, router = express.Router()) {
    this._server = server;
    this._router = router;
  }

  bind() {
    this._router.get('/', this.getAll.bind(this));
    this._router.get('/pending', this.getPending.bind(this));
    this._router.get('/running', this.getRunning.bind(this));
    this._router.get('/completed', this.getCompleted.bind(this));
    this._router.get('/failed', this.getFailed.bind(this));
    this._router.get('/:id', this.getOne.bind(this));
    return this._router;
  }

  getAll(req, res) {
    this._server.stats.counter('server.endpoint.event');
    logger.debug('Getting all events.');

    this._server.queues.getAll().then(events => {
      logger.debug('Found %s events.', events.length);
      res.status(200).send(events);
    });
  }

  getOne(req, res) {
    const eventId = req.params.id;

    this._server.stats.counter(`server.endpoint.event.${eventId}`);
    logger.debug('Getting event %s.', eventId);

    const event = this._server.queues.get(eventId).then(events => {
      if (events && events.length) {
        logger.debug('Found %s events matching id %s.', events.length, eventId, {events});
        res.status(200).send(events);
      } else {
        logger.debug('Found no events matching id %s.', eventId);
        res.status(404).send([]);
      }
    });
  }

  getPending(req, res) {
    this._server.stats.counter('server.endpoint.event.pending');
    logger.debug('Getting pending events.');

    return this._server.queues.getPending().then(events => {
      res.status(200).send(events);
    });
  }

  getRunning(req, res) {
    this._server.stats.counter('server.endpoint.event.running');
    logger.debug('Getting running events.');

    return this._server.queues.getRunning().then(events => {
      res.status(200).send(events);
    });
  }

  getCompleted(req, res) {
    this._server.stats.counter('server.endpoint.event.completed');
    logger.debug('Getting completed events.');

    return this._server.queues.getCompleted().then(events => {
      res.status(200).send(events);
    });
  }

  getFailed(req, res) {
    this._server.stats.counter('server.endpoint.event.failed');
    logger.debug('Getting failed events.');

    return this._server.queues.getFailed().then(events => {
      res.status(200).send(events);
    });
  }
}
