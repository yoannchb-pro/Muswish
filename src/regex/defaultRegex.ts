const REG: { [key: string]: string } = {
  START_CODE: String.raw`{{`,
  END_CODE: String.raw`}}`,

  CONTENT: String.raw`[^\[\]]+?`,
  CONTENT_MULTILINE: String.raw`[\s\S]*?`,

  OPTIONAL_SPACE: String.raw`[\s\t]*`,
  OPTIONAL_SPACE_MULTILINE: String.raw`[\s\t\n]*`,

  INSTRUCTION_START: String.raw`\[`,
  INSTRUCTION_END: String.raw`\]`,
};

export default REG;
