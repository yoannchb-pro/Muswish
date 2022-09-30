import getDeepObj from "../utils/getDeepObj";
import { RULE } from "./index";
import { Data } from "../utils/dataType";

const ORIGINAL_DATA: RULE = {
  open: ">",
  fn: function (
    _m: string,
    template: string,
    content: string,
    data: Data,
    originalData: Data
  ) {
    return getDeepObj(originalData, content, data);
  },
};

export default ORIGINAL_DATA;
