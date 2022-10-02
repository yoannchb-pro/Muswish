function keepOnlyNewLine(spaceStart: string): string {
  return spaceStart.includes("\n") ? "\n" : spaceStart;
}

export default keepOnlyNewLine;
