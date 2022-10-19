declare let data: Data;
declare type URL = string;
interface License {
    "reference": URL;
    "isDeprecatedLicenseId"?: boolean;
    "detailsUrl": URL;
    "referenceNumber": number;
    "name": string;
    "licenseId": string;
    "seeAlso"?: URL[];
    "isOsiApproved"?: boolean;
    "isFsfLibre"?: boolean;
}
interface Data {
    licenses: License[];
    licenseListVersion: string;
    releaseDate: string;
}
export declare function getIDs(): string[];
export declare function getLicenses(): License[];
export declare function getApprovedLicenses(): License[];
export declare function getFreeLicenses(): License[];
export declare function getDeprecatedLicenses(): License[];
export declare function getReleaseDate(): string;
export declare function getVersion(): string;
export declare function getByExpression(expr: string): License[];
export declare function update(): Promise<typeof data>;
export {};
