const REG: { [key: string]: string } = {
  START_CODE: String.raw`{{`,
  END_CODE: String.raw`}}`,

  CONTENT: String.raw`[\s\S]*?`,

  OPTIONAL_SPACE: String.raw`[ \t]*`,
  OPTIONAL_SPACE_MULTILINE: String.raw`[\s\t]*`,

  SPACE_START: String.raw`(?:\n[\t ]*)?`,

  INSTRUCTION_START: String.raw`\[`,
  INSTRUCTION_END: String.raw`\]`,
};

export default REG;
