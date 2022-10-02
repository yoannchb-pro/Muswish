import getDeepObj from "../utils/getDeepObj";
import { RULE } from "./index";
import { Data } from "../utils/dataType";

const IF_NOT: RULE = {
  open: "IF NOT",
  close: "END IF NOT",
  matchNewLine: true,
  fn: function (
    _m: string,
    template: string,
    content: string,
    data: Data,
    originalData: Data,
    callback: Function
  ) {
    const value = getDeepObj(data, content);
    if (!value && template) {
      return callback(template, data);
    }
    return "";
  },
};

export default IF_NOT;
