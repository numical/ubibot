const t = require('tap');
const td = require('testdouble');

td.replace('debug', () => () => {});

const subject = require('./api.js');

t.isA(subject.start, 'function', 'API has a start function');

t.test('start method', (t) => {
  subject.start();
  t.end();
});

t.tearDown(() => { td.reset(); });
