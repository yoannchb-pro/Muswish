import getDeepObj from "../utils/getDeepObj";
import { RULE } from "./index";
import { Data } from "../utils/dataType";

const ORIGINAL_DATA: RULE = {
  open: ">",
  fn: function (
    _m: string,
    template: string,
    spaceStart: string,
    content: string,
    data: Data,
    originalData: Data
  ) {
    const item = getDeepObj(originalData, content, data);
    return item ? spaceStart + item : item;
  },
};

export default ORIGINAL_DATA;
