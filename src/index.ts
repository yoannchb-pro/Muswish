import generateRegex from "./regex/builder";
import REG from "./regex/defaultRegex";
import RULES from "./rules.ts";
import { RULE } from "./rules.ts/index";

function muswish(template: string, data: any, originalData?: any): string {
  return muswish.TEMPLATING_REG.reduce(
    (a, b) =>
      (a = a.replace(
        b,
        function (
          _match: string,
          opener: string,
          content: string,
          template: string,
          close: string
        ) {
          const handler = Object.values(RULES).find(
            (e) => e.open?.toLowerCase() == opener?.toLowerCase()
          );
          if (handler) {
            return handler.fn(
              _match,
              template,
              content,
              data,
              originalData ?? data,
              muswish
            );
          }
          return _match;
        }
      )),
    template
  );
}

muswish.TEMPLATING_REG = generateRegex();

muswish.addPlugin = function (name: string, rule: RULE) {
  RULES[name] = rule;
  muswish.TEMPLATING_REG = generateRegex();
};

muswish.customDelimiters = function (opener: string, closer: string) {
  REG.START_CODE = opener;
  REG.END_CODE = closer;
  muswish.TEMPLATING_REG = generateRegex();
};

export default muswish;
