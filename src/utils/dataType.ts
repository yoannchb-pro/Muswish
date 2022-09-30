export type DataValue = string | number | Data | (() => string | number | Data);

export interface Data
  extends Record<string | number | symbol, DataValue | DataValue[]> {}
