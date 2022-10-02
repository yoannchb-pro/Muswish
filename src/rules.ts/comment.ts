import { RULE } from "./index";
import { Data } from "../utils/dataType";

const COMMENT: RULE = {
  open: "@@",
  fn: function (
    _m: string,
    template: string,
    spaceStart: string,
    content: string,
    data: Data
  ) {
    return "";
  },
};

export default COMMENT;
