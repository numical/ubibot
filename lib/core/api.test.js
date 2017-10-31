const content = require('../../languages/default.json');
const t = require('tap');
const td = require('testdouble');

const debug = td.function();
td.replace('debug', () => debug);

const subject = require('./api.js');

t.test('start method', (t) => {
  t.isA(subject.start, 'function', 'API has a start function');
  subject.start();
  td.verify(debug(content['ubibot.core.start']));
  td.verify(debug(content['ubibot.core.started']));
  t.end();
});

t.tearDown(() => { td.reset(); });
