
const DATASRCURL = 'https://raw.githubusercontent.com/spdx/license-list-data/master/json/licenses.json'

import req from './http-promise'
import { writeFile } from 'fs/promises'
import localData from './data.json'
import { readFileSync } from 'fs'

let data = localData

export function getAllIds() {
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


export async function update(): Promise<typeof data> {
    const origReleaseDate = getReleaseDate()
    const resp = await req(DATASRCURL)
    console.log(resp.body)
    await writeFile('./data.json', resp.body)
    data = JSON.parse(resp.body)
    const newReleaseDate = getReleaseDate()
    if (!origReleaseDate || (origReleaseDate !== newReleaseDate)) {
        const
            pkgJson = readFileSync('./package.json').toString(),
            pkg = JSON.parse(pkgJson),
            ver = pkg.version.split('.').map((x: string, index: number) => {
                return (2 === index) ? '' + (parseInt(x) + 1) : x
            }).join('.')
        pkg.version = ver
        await writeFile('./package.json', JSON.stringify(pkg, null, 2))
        console.log('Package version updated. New version is ' + ver)
    }
    return data
}
