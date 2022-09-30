import REG from "./defaultRegex";
import RULES from "../rules.ts";

function generateRegex() {
  const regexList: string[] = [];

  for (const RULE of Object.values(RULES)) {
    const START = `${REG.START_CODE}${REG.OPTIONAL_SPACE}`;
    const END = `${REG.OPTIONAL_SPACE}${REG.END_CODE}`;
    const OPENER = RULE.open
      ? `${REG.INSTRUCTION_START}${REG.OPTIONAL_SPACE}(${RULE.open})${REG.OPTIONAL_SPACE}${REG.INSTRUCTION_END}${REG.OPTIONAL_SPACE}`
      : `(${RULE.open})`;
    const CLOSER = !!RULE.close
      ? `${REG.INSTRUCTION_START}${REG.OPTIONAL_SPACE}(${RULE.close})${REG.OPTIONAL_SPACE}${REG.INSTRUCTION_END}${REG.OPTIONAL_SPACE}`
      : false;
    const CONTENT = `(${REG.CONTENT})`;

    regexList.push(
      CLOSER
        ? `${START}${OPENER}${CONTENT}${END}\n?(${REG.CONTENT_MULTILINE})\n?${START}${CLOSER}${END}`
        : `${START}${OPENER}${CONTENT}${END}\n?`
    );
  }
  return regexList.map((e) => new RegExp(e, "gim"));
}

export default generateRegex;
