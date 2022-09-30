(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.muswish = factory());
})(this, (function () { 'use strict';

  const REG = {
      START_CODE: String.raw `{{`,
      END_CODE: String.raw `}}`,
      CONTENT: String.raw `[^\[\]]+?`,
      CONTENT_MULTILINE: String.raw `[\s\S]*?`,
      OPTIONAL_SPACE: String.raw `[\s\t]*`,
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
      fn: function (_m, template, content, data, originalData, callback) {
          const value = getDeepObj(data, content);
          if (value && template) {
              return callback(template, data);
          }
          return "";
      },
  };

  const FOR = {
      open: "FOR",
      close: "END FOR",
      fn: function (_m, template, content, data, originalData, callback) {
          const items = getDeepObj(data, content);
          if (!(items instanceof Array))
              return "";
          return items
              .map((e) => callback(template, e, originalData))
              .join("\n");
      },
  };

  const IF_NOT = {
      open: "IF NOT",
      close: "END IF NOT",
      fn: function (_m, template, content, data, originalData, callback) {
          const value = getDeepObj(data, content);
          if (!value && template) {
              return callback(template, data);
          }
          return "";
      },
  };

  const DATA = {
      open: "",
      fn: function (_m, template, content, data) {
          return getDeepObj(data, content);
      },
  };

  const ORIGINAL_DATA = {
      open: ">",
      fn: function (_m, template, content, data, originalData) {
          return getDeepObj(originalData, content, data);
      },
  };

  const DONT_DISPLAY = {
      open: "!!",
      fn: function (_m, template, content, data) {
          return content;
      },
  };

  const COMMENT = {
      open: "@@",
      fn: function (_m, template, content, data) {
          return "";
      },
  };

  //the order is pretty important
  const RULES = {
      DONT_DISPLAY: DONT_DISPLAY,
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
          const START = String.raw `${REG.START_CODE}${REG.OPTIONAL_SPACE}`;
          const END = String.raw `${REG.OPTIONAL_SPACE}${REG.END_CODE}`;
          const OPENER = RULE.open
              ? String.raw `${REG.INSTRUCTION_START}${REG.OPTIONAL_SPACE}(${RULE.open})${REG.OPTIONAL_SPACE}${REG.INSTRUCTION_END}${REG.OPTIONAL_SPACE}`
              : String.raw `(${RULE.open})`;
          const CLOSER = !!RULE.close
              ? String.raw `${REG.INSTRUCTION_START}${REG.OPTIONAL_SPACE}(${RULE.close})${REG.OPTIONAL_SPACE}${REG.INSTRUCTION_END}${REG.OPTIONAL_SPACE}\2`
              : false;
          const CONTENT = String.raw `(${REG.CONTENT})`;
          regexList.push(CLOSER
              ? String.raw `${START}${OPENER}${CONTENT}${END}\n?(${REG.CONTENT_MULTILINE})\n?${START}${CLOSER}${END}`
              : String.raw `${START}${OPENER}${CONTENT}${END}\n?`);
      }
      return regexList.map((e) => new RegExp(e, "gim"));
  }

  const TEMPLATING_REG = generateRegex();
  function muswish(template, data, originalData) {
      return TEMPLATING_REG.reduce((a, b) => (a = a.replace(b, function (_match, opener, content, template, close) {
          const handler = Object.values(RULES).find((e) => { var _a; return ((_a = e.open) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == (opener === null || opener === void 0 ? void 0 : opener.toLowerCase()); });
          if (handler) {
              return handler.fn(_match, template, content, data, originalData !== null && originalData !== void 0 ? originalData : data, muswish);
          }
          return _match;
      })), template);
  }

  return muswish;

}));
//# sourceMappingURL=index.js.map