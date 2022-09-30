import REG from "./defaultRegex";
import RULES from "../rules.ts";

function generateRegex() {
  const regexList: string[] = [];

  for (const RULE of Object.values(RULES)) {
    const START = String.raw`${REG.START_CODE}${REG.OPTIONAL_SPACE}`;
    const END = String.raw`${REG.OPTIONAL_SPACE}${REG.END_CODE}`;
    const OPENER = RULE.open
      ? String.raw`${REG.INSTRUCTION_START}${REG.OPTIONAL_SPACE}(${RULE.open})${REG.OPTIONAL_SPACE}${REG.INSTRUCTION_END}${REG.OPTIONAL_SPACE}`
      : String.raw`(${RULE.open})`;
    const CLOSER = !!RULE.close
      ? String.raw`${REG.INSTRUCTION_START}${REG.OPTIONAL_SPACE}(${RULE.close})${REG.OPTIONAL_SPACE}${REG.INSTRUCTION_END}${REG.OPTIONAL_SPACE}\2`
      : false;
    const CONTENT = String.raw`(${REG.CONTENT})`;

    regexList.push(
      CLOSER
        ? String.raw`${START}${OPENER}${CONTENT}${END}\n?(${REG.CONTENT_MULTILINE})\n?${START}${CLOSER}${END}`
        : String.raw`${START}${OPENER}${CONTENT}${END}\n?`
    );
  }

  return regexList.map((e) => new RegExp(e, "gim"));
}

export default generateRegex;
