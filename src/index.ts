import generateRegex from "./regex/builder";
import RULES from "./rules.ts";

const TEMPLATING_REG = generateRegex();

function muswish(template: string, data: any, originalData?: any) {
  return TEMPLATING_REG.reduce(
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

export default muswish;
