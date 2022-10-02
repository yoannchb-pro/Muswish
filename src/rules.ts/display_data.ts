import getDeepObj from "../utils/getDeepObj";
import { RULE } from "./index";
import { Data } from "../utils/dataType";

const DATA: RULE = {
  open: "",
  fn: function (
    _m: string,
    template: string,
    spaceStart: string,
    content: string,
    data: Data
  ) {
    const item = getDeepObj(data, content);
    return item ? spaceStart + item : item;
  },
};

export default DATA;
