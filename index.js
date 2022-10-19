"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.getByExpression = exports.getVersion = exports.getReleaseDate = exports.getDeprecatedLicenses = exports.getFreeLicenses = exports.getApprovedLicenses = exports.getLicenses = exports.getIDs = void 0;
const DATASRCURL = 'https://raw.githubusercontent.com/spdx/license-list-data/master/json/licenses.json';
const http_promise_1 = __importDefault(require("./http-promise"));
const promises_1 = require("fs/promises");
const data_json_1 = __importDefault(require("./data.json"));
const fs_1 = require("fs");
let data = data_json_1.default;
function getIDs() {
    return data.licenses.map(item => item.licenseId);
}
exports.getIDs = getIDs;
function getLicenses() {
    return data.licenses;
}
exports.getLicenses = getLicenses;
function getApprovedLicenses() {
    return data.licenses.filter(item => item.isOsiApproved);
}
exports.getApprovedLicenses = getApprovedLicenses;
function getFreeLicenses() {
    return data.licenses.filter(item => item.isFsfLibre);
}
exports.getFreeLicenses = getFreeLicenses;
function getDeprecatedLicenses() {
    return data.licenses.filter(item => item.isDeprecatedLicenseId);
}
exports.getDeprecatedLicenses = getDeprecatedLicenses;
function getReleaseDate() {
    return data.releaseDate;
}
exports.getReleaseDate = getReleaseDate;
function getVersion() {
    return data.licenseListVersion;
}
exports.getVersion = getVersion;
function getByExpression(expr) {
    const parts = expr.split(/OR|\+|AND/g).map(x => { return x.trim(); });
    return getLicenses().filter(item => {
        for (var part of parts) {
            if (item.licenseId.indexOf(part) === 0) {
                return true;
            }
        }
        return false;
    });
}
exports.getByExpression = getByExpression;
function update() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Downloading SPDX data... ');
        const origReleaseDate = getReleaseDate();
        const resp = yield (0, http_promise_1.default)(DATASRCURL);
        yield (0, promises_1.writeFile)('./data.json', resp.body);
        data = JSON.parse(resp.body);
        const newReleaseDate = getReleaseDate();
        if (!origReleaseDate || (origReleaseDate !== newReleaseDate)) {
            console.log('SPDX version has changed: ' + newReleaseDate);
            const pkgJson = (0, fs_1.readFileSync)('./package.json').toString(), pkg = JSON.parse(pkgJson), ver = pkg.version.split('.').map((x, index) => {
                return (2 === index) ? '' + (parseInt(x) + 1) : x;
            }).join('.');
            pkg.version = ver;
            yield (0, promises_1.writeFile)('./package.json', JSON.stringify(pkg, null, 2));
            console.log('Package version updated. New version is ' + ver);
        }
        else {
            console.log('SPDX version already updated: ' + getVersion());
        }
        console.log('SPDX Version:' + getVersion());
        console.log('SPDX Release Date:' + getReleaseDate());
        return data;
    });
}
exports.update = update;
