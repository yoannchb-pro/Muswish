(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.muswish = factory());
})(this, (function () { 'use strict';

  const REG = {
      START_CODE: String.raw `{{`,
      END_CODE: String.raw `}}`,
      CONTENT: String.raw `[\s\S]*?`,
      OPTIONAL_SPACE: String.raw `[ \t]*`,
      OPTIONAL_SPACE_MULTILINE: String.raw `[\s\t]*`,
      SPACE_START: String.raw `(?:\n[\t ]*)?`,
      INSTRUCTION_START: String.raw `\[`,
      INSTRUCTION_END: String.raw `\]`,
  };

  function getDeepObj(obj, path, context) {
      const pathes = path
          .replace(/\[(\d+)\]/gi, (_m, nb) => `.${nb}`) //obj[0] -> obj.0
          .split(".");
      let value = obj;
      if (typeof value === "function")
          value = value.call(context !== null && context !== void 0 ? context : obj);
      if (pathes[0] === "this") {
          pathes.shift();
      }
      for (const key of pathes) {
          if (!value[key])
              return "";
          value = value[key];
          if (typeof value === "function")
              value = value.call(context !== null && context !== void 0 ? context : obj);
      }
      return value;
  }

  const IF = {
      open: "IF",
      close: "END IF",
      fn: function (_m, template, spaceStart, content, data, originalData, callback) {
          const value = getDeepObj(data, content);
          if (value && template) {
              return spaceStart + callback(template, data);
          }
          return "";
      },
  };

  function keepOnlyNewLine(spaceStart) {
      return spaceStart.includes("\n") ? "\n" : spaceStart;
  }

  const FOR = {
      open: "FOR",
      close: "END FOR",
      fn: function (_m, template, spaceStart, content, data, originalData, callback) {
          const items = getDeepObj(data, content);
          if (!(items instanceof Array) || items.length === 0)
              return "";
          return (keepOnlyNewLine(spaceStart) +
              items.map((e) => callback(template, e, originalData)).join("\n"));
      },
  };

  const IF_NOT = {
      open: "IF NOT",
      close: "END IF NOT",
      fn: function (_m, template, spaceStart, content, data, originalData, callback) {
          const value = getDeepObj(data, content);
          if (!value && template) {
              return spaceStart + callback(template, data);
          }
          return "";
      },
  };

  const DATA = {
      open: "",
      fn: function (_m, template, spaceStart, content, data) {
          const item = getDeepObj(data, content);
          return item ? spaceStart + item : item;
      },
  };

  const ORIGINAL_DATA = {
      open: ">",
      fn: function (_m, template, spaceStart, content, data, originalData) {
          const item = getDeepObj(originalData, content, data);
          return item ? spaceStart + item : item;
      },
  };

  const COMMENT = {
      open: "@@",
      fn: function (_m, template, spaceStart, content, data) {
          return "";
      },
  };

  //the order is pretty important
  const RULES = {
      COMMENT: COMMENT,
      IF: IF,
      IF_NOT: IF_NOT,
      FOR: FOR,
      ORIGINAL_DATA: ORIGINAL_DATA,
      DATA: DATA,
  };

  function generateRegex() {
      const regexList = [];
      for (const RULE of Object.values(RULES)) {
          const SPACE = REG.OPTIONAL_SPACE_MULTILINE;
          const START = String.raw `${REG.START_CODE}${SPACE}`;
          const END = String.raw `${SPACE}${REG.END_CODE}`;
          const OPENER = RULE.open
              ? String.raw `${REG.INSTRUCTION_START}${SPACE}(${RULE.open})${SPACE}${REG.INSTRUCTION_END}${SPACE}`
              : String.raw `(${RULE.open})`;
          const CLOSER = !!RULE.close
              ? String.raw `${REG.INSTRUCTION_START}${SPACE}(${RULE.close})${SPACE}${REG.INSTRUCTION_END}${SPACE}\3`
              : false;
          const CONTENT = String.raw `(${REG.CONTENT})`;
          regexList.push(CLOSER
              ? String.raw `(${REG.SPACE_START})${START}${OPENER}${CONTENT}${END}\n*(${REG.CONTENT})\s*${START}${CLOSER}${END}`
              : String.raw `(${REG.SPACE_START})${START}${OPENER}${CONTENT}${END}`);
      }
      return regexList.map((e) => new RegExp(e, "gim"));
  }

  function muswish(template, data, originalData) {
      return muswish.TEMPLATING_REG.reduce((a, b) => (a = a.replace(b, function (_match, spaceStart, opener, content, template, close) {
          const handler = Object.values(RULES).find((e) => { var _a; return ((_a = e.open) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == (opener === null || opener === void 0 ? void 0 : opener.toLowerCase()); });
          if (handler) {
              return handler.fn(_match, template, spaceStart, content, data, originalData !== null && originalData !== void 0 ? originalData : data, muswish);
          }
          return _match;
      })), template);
  }
  muswish.TEMPLATING_REG = generateRegex();
  muswish.addPlugin = function (name, rule) {
      RULES[name] = rule;
      muswish.TEMPLATING_REG = generateRegex();
  };
  muswish.customDelimiters = function (opener, closer) {
      REG.START_CODE = opener;
      REG.END_CODE = closer;
      muswish.TEMPLATING_REG = generateRegex();
  };

  return muswish;

}));
//# sourceMappingURL=index.js.map
