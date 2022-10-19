
const DATASRCURL = 'https://raw.githubusercontent.com/spdx/license-list-data/master/json/licenses.json'

import req from './http-promise'
import { writeFile } from 'fs/promises'
import localData from './data.json'
import { readFileSync } from 'fs'

let data: Data = localData

type URL = string
interface License {
    "reference": URL,
    "isDeprecatedLicenseId"?: boolean,
    "detailsUrl": URL,
    "referenceNumber": number,
    "name": string,
    "licenseId": string,
    "seeAlso"?: URL[],
    "isOsiApproved"?: boolean,
    "isFsfLibre"?: boolean
}
interface Data {
    licenses: License[],
    licenseListVersion: string,
    releaseDate: string
}

export function getIDs() {
    return data.licenses.map(item => item.licenseId)
}

export function getLicenses() {
    return data.licenses
}

export function getApprovedLicenses() {
    return data.licenses.filter(item => item.isOsiApproved)
}

export function getFreeLicenses() {
    return data.licenses.filter(item => item.isFsfLibre)
}

export function getDeprecatedLicenses() {
    return data.licenses.filter(item => item.isDeprecatedLicenseId)
}

export function getReleaseDate() {
    return data.releaseDate
}

export function getVersion() {
    return data.licenseListVersion
}

export function getByExpression(expr: string): License[] {
    const parts = expr.split(/OR|\+|AND/g).map(x => { return x.trim() })
    return getLicenses().filter(item => {
        for (var part of parts) {
            if (item.licenseId.indexOf(part) === 0) {
                return true
            }
        }
        return false
    })
}


export async function update(): Promise<typeof data> {
    console.log('Downloading SPDX data... ')
    const origReleaseDate = getReleaseDate()
    const resp = await req(DATASRCURL)
    await writeFile('./data.json', resp.body)
    data = JSON.parse(resp.body)
    const newReleaseDate = getReleaseDate()
    if (!origReleaseDate || (origReleaseDate !== newReleaseDate)) {
        console.log('SPDX version has changed: ' + newReleaseDate)
        const
            pkgJson = readFileSync('./package.json').toString(),
            pkg = JSON.parse(pkgJson),
            ver = pkg.version.split('.').map((x: string, index: number) => {
                return (2 === index) ? '' + (parseInt(x) + 1) : x
            }).join('.')
        pkg.version = ver
        await writeFile('./package.json', JSON.stringify(pkg, null, 2))
        console.log('Package version updated. New version is ' + ver)
    } else {
        console.log('SPDX version already updated: ' + getVersion())
    }
    console.log('SPDX Version:' + getVersion())
    console.log('SPDX Release Date:' + getReleaseDate())
    return data
}


