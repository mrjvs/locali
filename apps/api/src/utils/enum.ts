export type Enum<T extends Record<string, string>> = T[keyof T];
