import { RULE } from "./index";
import { Data } from "../utils/dataType";

const DONT_DISPLAY: RULE = {
  open: "!!",
  fn: function (_m: string, template: string, content: string, data: Data) {
    return content;
  },
};

export default DONT_DISPLAY;
