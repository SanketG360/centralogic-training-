"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretHandshake = exports.isLeapYear = exports.concatString = exports.splitString = void 0;
function splitString(inputstring) {
    return inputstring.split('_').join(' ');
}
exports.splitString = splitString;
function concatString(inputdata1, inputdata2) {
    return inputdata1.concat(inputdata2);
}
exports.concatString = concatString;
function isLeapYear(year) {
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        return true;
    }
    else {
        return false;
    }
}
exports.isLeapYear = isLeapYear;
function secretHandshake(decimalNumber) {
    if (isNaN(decimalNumber) || decimalNumber < 1 || Math.floor(decimalNumber) !== decimalNumber) {
        throw new Error("Input must be a positive integer.");
    }
    const actions = [];
    if (decimalNumber & 1)
        actions.push("wink");
    if (decimalNumber & 2)
        actions.push("double blink");
    if (decimalNumber & 4)
        actions.push("close your eyes");
    if (decimalNumber & 8)
        actions.push("jump");
    if (decimalNumber & 16)
        actions.reverse();
    return actions;
}
exports.secretHandshake = secretHandshake;
//# sourceMappingURL=Logic.js.map