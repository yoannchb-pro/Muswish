import { RULE } from "./index";
import { Data } from "../utils/dataType";

const COMMENT: RULE = {
  open: "@@",
  multilines: true,
  matchNewLine: true,
  fn: function (_m: string, template: string, content: string, data: Data) {
    return "";
  },
};

export default COMMENT;
