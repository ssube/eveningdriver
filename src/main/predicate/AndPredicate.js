import Predicate from './Predicate';

export default class OrPredicate extends Predicate {
  constructor(opts) {
    super(opts);
  }

  test(data) {
    return this._sub.every(child => child.test(data));
  }
}
