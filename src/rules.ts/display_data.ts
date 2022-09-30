import getDeepObj from "../utils/getDeepObj";
import { RULE } from "./index";
import { Data } from "../utils/dataType";

const DATA: RULE = {
  open: "",
  fn: function (_m: string, template: string, content: string, data: Data) {
    return getDeepObj(data, content);
  },
};

export default DATA;
