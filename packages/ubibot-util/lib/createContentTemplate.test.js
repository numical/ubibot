/* eslint no-template-curly-in-string: 0 */

const { test } = require("tape");
const createContentTemplate = require("./createContentTemplate");

test("createContentTemplate", t => {
  const staticString = "She sells sea shells";
  const staticTemplate = createContentTemplate(staticString);
  t.equal(staticTemplate(), staticString, "static string returned when no arguments passed");
  t.equal(staticTemplate({ verb: "smell" }), staticString, "static string returned when tokens are passed");

  const templateString = "She ${verb}s ${noun}";
  const template = createContentTemplate(templateString);
  t.equal(template(), templateString, "template expession returned when no tokens are passed");
  t.equal(template({ verb: "smell" }), "She smells ${noun}", "partial template returned when some tokens are passed");
  const tokens = {
    verb: "smell",
    noun: "bells"
  };
  t.equal(template(tokens), "She smells bells", "resolved template returned when all tokens are passed");

  const fnTemplateString = "She ${verb}s ${number} ${noun}, saying ${sheSays}";
  const fnTemplate = createContentTemplate(fnTemplateString, {
    number: () => 5,
    sheSays: ({ verb, noun }) => `I ${verb} ${noun}`
  });
  t.equal(fnTemplate(tokens), "She smells 5 bells, saying I smell bells", "uses passed function expressions");

  t.end();
});
