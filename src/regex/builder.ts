import REG from "./defaultRegex";
import RULES from "../rules.ts";

function generateRegex() {
  const regexList: string[] = [];

  for (const RULE of Object.values(RULES)) {
    const SPACE = REG.OPTIONAL_SPACE_MULTILINE;

    const START = String.raw`${REG.START_CODE}${SPACE}`;
    const END = String.raw`${SPACE}${REG.END_CODE}`;

    const OPENER = RULE.open
      ? String.raw`${REG.INSTRUCTION_START}${SPACE}(${RULE.open})${SPACE}${REG.INSTRUCTION_END}${SPACE}`
      : String.raw`(${RULE.open})`;
    const CLOSER = !!RULE.close
      ? String.raw`${REG.INSTRUCTION_START}${SPACE}(${RULE.close})${SPACE}${REG.INSTRUCTION_END}${SPACE}\3`
      : false;

    const CONTENT = String.raw`(${REG.CONTENT})`;

    regexList.push(
      CLOSER
        ? String.raw`(${REG.SPACE_START})${START}${OPENER}${CONTENT}${END}\n*(${REG.CONTENT})\s*${START}${CLOSER}${END}`
        : String.raw`(${REG.SPACE_START})${START}${OPENER}${CONTENT}${END}`
    );
  }

  return regexList.map((e) => new RegExp(e, "gim"));
}

export default generateRegex;
