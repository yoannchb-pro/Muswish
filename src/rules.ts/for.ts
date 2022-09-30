import getDeepObj from "../utils/getDeepObj";
import { RULE } from "./index";
import { Data } from "../utils/dataType";

const FOR: RULE = {
  open: "FOR",
  close: "END FOR",
  fn: function (
    _m: string,
    template: string,
    content: string,
    data: Data,
    originalData: Data,
    callback: Function
  ) {
    const items = getDeepObj(data, content);
    if (!(items instanceof Array)) return "";
    return items
      .map((e: Data) => callback(template, e, originalData))
      .join("\n");
  },
};

export default FOR;
