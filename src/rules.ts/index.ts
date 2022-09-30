import IF from "./if";
import FOR from "./for";
import IF_NOT from "./if_not";
import DATA from "./display_data";
import ORIGINAL_DATA from "./display_original_data";
import DONT_DISPLAY from "./dont_display";
import COMMENT from "./comment";
import { Data } from "../utils/dataType";

export type RULE = {
  open: string;
  close?: string;
  fn: (
    _m: string,
    template: string,
    content: string,
    data: Data,
    originalData: Data,
    callback: Function
  ) => string;
};

//the order is pretty important
const RULES: {
  [key: string]: RULE;
} = {
  DONT_DISPLAY: DONT_DISPLAY,
  COMMENT: COMMENT,
  IF: IF,
  IF_NOT: IF_NOT,
  FOR: FOR,
  ORIGINAL_DATA: ORIGINAL_DATA,
  DATA: DATA,
};

export default RULES;
