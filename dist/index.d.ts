type DataValue = string | number | Data | (() => string | number | Data);
interface Data extends Record<string | number | symbol, DataValue | DataValue[]> {
}
type RULE = {
    open: string;
    close?: string;
    multilines?: boolean;
    matchNewLine?: boolean;
    fn: (_m: string, template: string, content: string, data: Data, originalData: Data, callback: Function) => string;
};
declare function muswish(template: string, data: any, originalData?: any): string;
declare namespace muswish {
    var TEMPLATING_REG: RegExp[];
    var addPlugin: (name: string, rule: RULE) => void;
    var customDelimiters: (opener: string, closer: string) => void;
}
export { muswish as default };
