/* eslint no-template-curly-in-string: 0 */

const { test } = require("tape");
const createTemplate = require("../lib/createTemplate");

const staticString = "She sells sea shells";
const templateString = "She ${verb} ${noun}";

test("createTemplate", t => {
  const staticTemplate = createTemplate(staticString);
  t.equal(staticTemplate(), staticString, "static string returned when no arguments passed");
  t.equal(staticTemplate({ verb: "smells" }), staticString, "static string returned when tokens are passed");

  const template = createTemplate(templateString);
  t.equal(template(), templateString, "template expession returned when no tokens are passed");
  t.equal(template({ verb: "smells" }), "She smells ${noun}", "partial template returned when some tokens are passed");
  t.equal(
    template({ verb: "smells", noun: "bells" }),
    "She smells bells",
    "resolved template returned when all tokens are passed"
  );

  t.end();
});
