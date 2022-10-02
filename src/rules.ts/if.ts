import getDeepObj from "../utils/getDeepObj";
import { RULE } from "./index";
import { Data } from "../utils/dataType";

const IF: RULE = {
  open: "IF",
  close: "END IF",
  fn: function (
    _m: string,
    template: string,
    spaceStart: string,
    content: string,
    data: Data,
    originalData: Data,
    callback: Function
  ) {
    const value = getDeepObj(data, content);
    if (value && template) {
      return spaceStart + callback(template, data);
    }
    return "";
  },
};

export default IF;
