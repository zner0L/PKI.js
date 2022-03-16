export type SchemaType = any;

export type SchemaNames = {
  blockName?: string;
  optional?: boolean;
};

export interface SchemaCompatible {
  /**
   * Convert parsed asn1js object into current class
   * @param schema
   */
  fromSchema(schema: SchemaType): void;
  /**
   * Convert current object to asn1js object and set correct values
   * @returns asn1js object
   */
  toSchema(): SchemaType;
  toJSON(): any;
}

export interface SchemaConstructor {
  schema?: SchemaType;
}

export interface SchemaParameters<N extends Record<string, any> = { /**/ }> {
  names?: SchemaNames & N;
}