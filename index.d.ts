declare let data: {
    licenseListVersion: string;
    licenses: ({
        reference: string;
        isDeprecatedLicenseId: boolean;
        detailsUrl: string;
        referenceNumber: number;
        name: string;
        licenseId: string;
        seeAlso: string[];
        isOsiApproved: boolean;
        isFsfLibre?: undefined;
    } | {
        reference: string;
        isDeprecatedLicenseId: boolean;
        detailsUrl: string;
        referenceNumber: number;
        name: string;
        licenseId: string;
        seeAlso: string[];
        isOsiApproved: boolean;
        isFsfLibre: boolean;
    })[];
    releaseDate: string;
};
export declare function getAllIds(): string[];
export declare function getLicenses(): ({
    reference: string;
    isDeprecatedLicenseId: boolean;
    detailsUrl: string;
    referenceNumber: number;
    name: string;
    licenseId: string;
    seeAlso: string[];
    isOsiApproved: boolean;
    isFsfLibre?: undefined;
} | {
    reference: string;
    isDeprecatedLicenseId: boolean;
    detailsUrl: string;
    referenceNumber: number;
    name: string;
    licenseId: string;
    seeAlso: string[];
    isOsiApproved: boolean;
    isFsfLibre: boolean;
})[];
export declare function getApprovedLicenses(): ({
    reference: string;
    isDeprecatedLicenseId: boolean;
    detailsUrl: string;
    referenceNumber: number;
    name: string;
    licenseId: string;
    seeAlso: string[];
    isOsiApproved: boolean;
    isFsfLibre?: undefined;
} | {
    reference: string;
    isDeprecatedLicenseId: boolean;
    detailsUrl: string;
    referenceNumber: number;
    name: string;
    licenseId: string;
    seeAlso: string[];
    isOsiApproved: boolean;
    isFsfLibre: boolean;
})[];
export declare function getFreeLicenses(): ({
    reference: string;
    isDeprecatedLicenseId: boolean;
    detailsUrl: string;
    referenceNumber: number;
    name: string;
    licenseId: string;
    seeAlso: string[];
    isOsiApproved: boolean;
    isFsfLibre?: undefined;
} | {
    reference: string;
    isDeprecatedLicenseId: boolean;
    detailsUrl: string;
    referenceNumber: number;
    name: string;
    licenseId: string;
    seeAlso: string[];
    isOsiApproved: boolean;
    isFsfLibre: boolean;
})[];
export declare function getDeprecatedLicenses(): ({
    reference: string;
    isDeprecatedLicenseId: boolean;
    detailsUrl: string;
    referenceNumber: number;
    name: string;
    licenseId: string;
    seeAlso: string[];
    isOsiApproved: boolean;
    isFsfLibre?: undefined;
} | {
    reference: string;
    isDeprecatedLicenseId: boolean;
    detailsUrl: string;
    referenceNumber: number;
    name: string;
    licenseId: string;
    seeAlso: string[];
    isOsiApproved: boolean;
    isFsfLibre: boolean;
})[];
export declare function getReleaseDate(): string;
export declare function getVersion(): string;
export declare function update(): Promise<typeof data>;
export {};
