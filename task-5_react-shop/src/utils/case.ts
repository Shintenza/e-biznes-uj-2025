type CamelCase<S extends string> = S extends `${infer F}_${infer RF}${infer R}`
  ? `${F}${Uppercase<RF>}${CamelCase<R>}`
  : S;

export type CamelCaseObject<T> = T extends Array<infer I>
  ? Array<CamelCaseObject<I>>
  : T extends { [K in keyof T]: unknown }
  ? {
      [K in keyof T as CamelCase<K & string>]: CamelCaseObject<T[K]>;
    }
  : T;

export const toCamelCase = <const T extends string>(input: T): CamelCase<T> => {
  if (/^[a-zA-Z]*$/.test(input)) return input as CamelCase<T>;
  return (input[0]!.toLowerCase() +
    input
      .split("_")
      .filter(Boolean)
      .map((word) => word[0]!.toUpperCase() + word.slice(1).toLowerCase())
      .join("")
      .slice(1)) as CamelCase<T>;
};

export const camelcased = <T>(input: T): CamelCaseObject<T> => {
  if (Array.isArray(input)) {
    return input.map(camelcased) as CamelCaseObject<T>;
  } else if (input && typeof input === "object") {
    return Object.entries(input).reduce(
      (acc, [key, value]) => (
        (acc[toCamelCase(key) as keyof CamelCaseObject<T>] = camelcased(value)),
        acc
      ),
      {} as CamelCaseObject<T>
    ) as CamelCaseObject<T>;
  } else {
    return input as CamelCaseObject<T>;
  }
};

const toSnakeCase = (str: string): string =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const isObject = (val: unknown): val is Record<string, unknown> =>
  typeof val === "object" && val !== null && !Array.isArray(val);

export const snakecased = (obj: unknown): unknown =>
  Array.isArray(obj)
    ? obj.map(snakecased)
    : isObject(obj)
    ? Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
          toSnakeCase(key),
          snakecased(value),
        ])
      )
    : obj;
