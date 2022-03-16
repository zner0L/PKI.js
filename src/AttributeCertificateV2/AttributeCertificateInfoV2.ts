import * as asn1js from "asn1js";
import { getParametersValue, clearProps } from "pvutils";
import GeneralNames from "../GeneralNames";
import AlgorithmIdentifier, { AlgorithmIdentifierSchema } from "../AlgorithmIdentifier";
import Attribute from "../Attribute";
import Extensions, { ExtensionsSchema } from "../Extensions";
import { AttCertValidityPeriod, AttCertValidityPeriodSchema } from "../AttributeCertificateV1";
import { V2Form } from "./V2Form";
import { Holder, HolderSchema } from "./Holder";
import * as Schema from "../Schema";

const VERSION = "version";
const HOLDER = "holder";
const ISSUER = "issuer";
const SIGNATURE = "signature";
const SERIAL_NUMBER = "serialNumber";
const ATTR_CERT_VALIDITY_PERIOD = "attrCertValidityPeriod";
const ATTRIBUTES = "attributes";
const ISSUER_UNIQUE_ID = "issuerUniqueID";
const EXTENSIONS = "extensions";
const CLEAR_PROPS = [
  VERSION,
  HOLDER,
  ISSUER,
  SIGNATURE,
  SERIAL_NUMBER,
  ATTR_CERT_VALIDITY_PERIOD,
  ATTRIBUTES,
  ISSUER_UNIQUE_ID,
  EXTENSIONS
];

export interface AttributeCertificateInfoV2Parameters extends Schema.SchemaConstructor {
  version?: number;
  holder?: Holder;
  issuer?: GeneralNames | V2Form;
  signature?: AlgorithmIdentifier;
  serialNumber?: asn1js.Integer;
  attrCertValidityPeriod?: AttCertValidityPeriod;
  attributes?: Attribute[];
  issuerUniqueID?: asn1js.BitString;
  extensions?: Extensions;
}

export type AttributeCertificateInfoV2Schema = Schema.SchemaParameters<{
  version?: string;
  holder?: HolderSchema;
  issuer?: string;
  signature?: AlgorithmIdentifierSchema;
  serialNumber?: string;
  attrCertValidityPeriod?: AttCertValidityPeriodSchema;
  attributes?: string;
  issuerUniqueID?: string;
  extensions?: ExtensionsSchema;
}>;

/**
 * Class from RFC5755
 */
export class AttributeCertificateInfoV2 implements Schema.SchemaCompatible {

  public version: number;
  public holder: Holder;
  public issuer: GeneralNames | V2Form;
  public signature: AlgorithmIdentifier;
  public serialNumber: asn1js.Integer;
  public attrCertValidityPeriod: AttCertValidityPeriod;
  public attributes: Attribute[];
  public issuerUniqueID?: asn1js.BitString;
  public extensions?: Extensions;

  /**
   * Constructor for AttributeCertificateInfoV2 class
   * @param parameters
   */
  constructor(parameters: AttributeCertificateInfoV2Parameters = {}) {
    //#region Internal properties of the object
    this.version = getParametersValue(parameters, VERSION, AttributeCertificateInfoV2.defaultValues(VERSION));
    this.holder = getParametersValue(parameters, HOLDER, AttributeCertificateInfoV2.defaultValues(HOLDER));
    this.issuer = getParametersValue(parameters, ISSUER, AttributeCertificateInfoV2.defaultValues(ISSUER));
    this.signature = getParametersValue(parameters, SIGNATURE, AttributeCertificateInfoV2.defaultValues(SIGNATURE));
    this.serialNumber = getParametersValue(parameters, SERIAL_NUMBER, AttributeCertificateInfoV2.defaultValues(SERIAL_NUMBER));
    this.attrCertValidityPeriod = getParametersValue(parameters, ATTR_CERT_VALIDITY_PERIOD, AttributeCertificateInfoV2.defaultValues(ATTR_CERT_VALIDITY_PERIOD));
    this.attributes = getParametersValue(parameters, ATTRIBUTES, AttributeCertificateInfoV2.defaultValues(ATTRIBUTES));
    if (parameters.issuerUniqueID) {
      this.issuerUniqueID = getParametersValue(parameters, ISSUER_UNIQUE_ID, AttributeCertificateInfoV2.defaultValues(ISSUER_UNIQUE_ID));
    }
    if (parameters.extensions) {
      this.extensions = getParametersValue(parameters, EXTENSIONS, AttributeCertificateInfoV2.defaultValues(EXTENSIONS));
    }
    //#endregion
    //#region If input argument array contains "schema" for this object
    if (parameters.schema)
      this.fromSchema(parameters.schema);
    //#endregion
  }

  /**
   * Return default values for all class members
   * @param memberName String name for a class member
   */
  public static defaultValues(memberName: typeof VERSION): number;
  public static defaultValues(memberName: typeof HOLDER): Holder;
  public static defaultValues(memberName: typeof ISSUER): GeneralNames | V2Form;
  public static defaultValues(memberName: typeof SIGNATURE): AlgorithmIdentifier;
  public static defaultValues(memberName: typeof SERIAL_NUMBER): asn1js.Integer;
  public static defaultValues(memberName: typeof ATTR_CERT_VALIDITY_PERIOD): AttCertValidityPeriod;
  public static defaultValues(memberName: typeof ATTRIBUTES): Attribute[];
  public static defaultValues(memberName: typeof ISSUER_UNIQUE_ID): asn1js.BitString;
  public static defaultValues(memberName: typeof EXTENSIONS): Extensions;
  public static defaultValues(memberName: string): any {
    switch (memberName) {
      case VERSION:
        return 1;
      case HOLDER:
        return new Holder();
      case ISSUER:
        return {};
      case SIGNATURE:
        return new AlgorithmIdentifier();
      case SERIAL_NUMBER:
        return new asn1js.Integer();
      case ATTR_CERT_VALIDITY_PERIOD:
        return new AttCertValidityPeriod();
      case ATTRIBUTES:
        return [];
      case ISSUER_UNIQUE_ID:
        return new asn1js.BitString();
      case EXTENSIONS:
        return new Extensions();
      default:
        throw new Error(`Invalid member name for AttributeCertificateInfoV2 class: ${memberName}`);
    }
  }

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * AttributeCertificateInfoV2 ::= SEQUENCE {
   *   version                 AttCertVersion, -- version is v2
   *   holder                  Holder,
   *   issuer                  AttCertIssuer,
   *   signature               AlgorithmIdentifier,
   *   serialNumber            CertificateSerialNumber,
   *   attrCertValidityPeriod  AttCertValidityPeriod,
   *   attributes              SEQUENCE OF Attribute,
   *   issuerUniqueID          UniqueIdentifier OPTIONAL,
   *   extensions              Extensions OPTIONAL
   * }
   * ```
   *
   * @param parameters Input parameters for the schema
   * @returns asn1js schema object
   */
  public static schema(parameters: AttributeCertificateInfoV2Schema = {}): Schema.SchemaType {
    const names = getParametersValue<NonNullable<typeof parameters.names>>(parameters, "names", {});

    return (new asn1js.Sequence({
      name: (names.blockName || ""),
      value: [
        new asn1js.Integer({ name: (names.version || "") }),
        Holder.schema(names.holder || {}),
        new asn1js.Choice({
          value: [
            GeneralNames.schema({
              names: {
                blockName: (names.issuer || "")
              }
            }),
            new asn1js.Constructed({
              name: (names.issuer || ""),
              idBlock: {
                tagClass: 3,
                tagNumber: 0 // [0]
              },
              value: V2Form.schema().valueBlock.value
            })
          ]
        }),
        AlgorithmIdentifier.schema(names.signature || {}),
        new asn1js.Integer({ name: (names.serialNumber || "") }),
        AttCertValidityPeriod.schema(names.attrCertValidityPeriod || {}),
        new asn1js.Sequence({
          name: (names.attributes || ""),
          value: [
            new asn1js.Repeated({
              value: Attribute.schema()
            })
          ]
        }),
        new asn1js.BitString({
          optional: true,
          name: (names.issuerUniqueID || "")
        }),
        Extensions.schema(names.extensions || {}, true)
      ]
    }));
  }

  /**
   * Convert parsed asn1js object into current class
   * @param schema
   */
  public fromSchema(schema: Schema.SchemaType): void {
    //#region Clear input data first
    clearProps(schema, CLEAR_PROPS);
    //#endregion
    //#region Check the schema is valid
    const asn1 = asn1js.compareSchema(schema,
      schema,
      AttributeCertificateInfoV2.schema({
        names: {
          version: VERSION,
          holder: {
            names: {
              blockName: HOLDER
            }
          },
          issuer: ISSUER,
          signature: {
            names: {
              blockName: SIGNATURE
            }
          },
          serialNumber: SERIAL_NUMBER,
          attrCertValidityPeriod: {
            names: {
              blockName: ATTR_CERT_VALIDITY_PERIOD
            }
          },
          attributes: ATTRIBUTES,
          issuerUniqueID: ISSUER_UNIQUE_ID,
          extensions: {
            names: {
              blockName: EXTENSIONS
            }
          }
        }
      })
    );

    if (!asn1.verified)
      throw new Error("Object's schema was not verified against input data for AttributeCertificateInfoV2");
    //#endregion
    //#region Get internal properties from parsed schema
    this.version = asn1.result.version.valueBlock.valueDec;
    this.holder = new Holder({ schema: asn1.result.holder });

    switch (asn1.result.issuer.idBlock.tagClass) {
      case 3: // V2Form
        this.issuer = new V2Form({
          schema: new asn1js.Sequence({
            value: asn1.result.issuer.valueBlock.value
          })
        });
        break;
      case 1: // GeneralNames (should not be used)
      default:
        throw new Error("Incorect value for 'issuer' in AttributeCertificateInfoV2");
    }

    this.signature = new AlgorithmIdentifier({ schema: asn1.result.signature });
    this.serialNumber = asn1.result.serialNumber;
    this.attrCertValidityPeriod = new AttCertValidityPeriod({ schema: asn1.result.attrCertValidityPeriod });
    this.attributes = Array.from(asn1.result.attributes.valueBlock.value, element => new Attribute({ schema: element }));

    if (ISSUER_UNIQUE_ID in asn1.result)
      this.issuerUniqueID = asn1.result.issuerUniqueID;

    if (EXTENSIONS in asn1.result)
      this.extensions = new Extensions({ schema: asn1.result.extensions });
    //#endregion
  }

  /**
   * Convert current object to asn1js object and set correct values
   * @returns asn1js object
   */
  public toSchema(): Schema.SchemaType {
    const result = new asn1js.Sequence({
      value: [
        new asn1js.Integer({ value: this.version }),
        this.holder.toSchema(),
        new asn1js.Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 0 // [0]
          },
          value: this.issuer.toSchema().valueBlock.value
        }),
        this.signature.toSchema(),
        this.serialNumber,
        this.attrCertValidityPeriod.toSchema(),
        new asn1js.Sequence({
          value: Array.from(this.attributes, element => element.toSchema())
        })
      ]
    });

    if (this.issuerUniqueID) {
      result.valueBlock.value.push(this.issuerUniqueID);
    }
    if (this.extensions) {
      result.valueBlock.value.push(this.extensions.toSchema());
    }

    return result;
  }

  /**
   * Conversion for the class to JSON object
   * @returns
   */
  public toJSON(): any {
    const result: any = {
      version: this.version,
      holder: this.holder.toJSON(),
      issuer: this.issuer.toJSON(),
      signature: this.signature.toJSON(),
      serialNumber: this.serialNumber.toJSON(),
      attrCertValidityPeriod: this.attrCertValidityPeriod.toJSON(),
      attributes: Array.from(this.attributes, element => element.toJSON())
    };

    if (this.issuerUniqueID) {
      result.issuerUniqueID = this.issuerUniqueID.toJSON();
    }
    if (this.extensions) {
      result.extensions = this.extensions.toJSON();
    }

    return result;
  }

}
