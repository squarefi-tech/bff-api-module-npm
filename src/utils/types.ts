export type EnumValues<T> = `${T & string}` extends `${infer V}` ? V : never;

// Diagnostic types for detecting mismatches
// Shows values that exist in enum but are missing in union
export type EnumValuesMissingInUnion<E, U> = Exclude<EnumValues<E>, U>;

// Shows values that exist in union but are missing in enum
export type UnionValuesMissingInEnum<E, U> = Exclude<U, EnumValues<E>>;

// Complex type showing all problems at once
export type EnumUnionMismatch<E, U> = {
  enumMissingInUnion: EnumValuesMissingInUnion<E, U>;
  unionMissingInEnum: UnionValuesMissingInEnum<E, U>;
  hasMismatch: [EnumValuesMissingInUnion<E, U>, UnionValuesMissingInEnum<E, U>] extends [never, never] ? false : true;
};

// Main type for checking equality of enum and union. If there's an error, use EnumUnionMismatch for diagnostics.
export type IsEnumEqualToUnion<E, U> = [EnumValues<E>] extends [U]
  ? [U] extends [EnumValues<E>]
    ? true
    : false
  : false;
