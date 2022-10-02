import getDeepObj from "../utils/getDeepObj";
import { RULE } from "./index";
import { Data } from "../utils/dataType";
import keepOnlyNewLine from "../utils/keepOnlyNewLine";

const FOR: RULE = {
  open: "FOR",
  close: "END FOR",
  fn: function (
    _m: string,
    template: string,
    spaceStart: string,
    content: string,
    data: Data,
    originalData: Data,
    callback: Function
  ) {
    const items = getDeepObj(data, content);
    if (!(items instanceof Array) || items.length === 0) return "";
    return (
      keepOnlyNewLine(spaceStart) +
      items.map((e: Data) => callback(template, e, originalData)).join("\n")
    );
  },
};

export default FOR;
