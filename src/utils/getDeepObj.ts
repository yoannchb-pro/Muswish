function getDeepObj(obj: any, path: string, context?: any): any {
  const pathes: string[] = path
    .replace(/\[(\d+)\]/gi, (_m: string, nb: string) => `.${nb}`) //obj[0] -> obj.0
    .split(".");

  let value: any = obj;

  if (typeof value === "function") value = value.call(context ?? obj);

  if (pathes[0] === "this") {
    pathes.shift();
  }

  for (const key of pathes) {
    if (!value[key]) return "";
    value = value[key];

    if (typeof value === "function") value = value.call(context ?? obj);
  }

  return value;
}

export default getDeepObj;
