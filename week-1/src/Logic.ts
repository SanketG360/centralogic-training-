export function splitString(inputstring: string){
    return inputstring.split('_').join(' ');
}

export function concatString(inputdata1:string,inputdata2:string){
    return inputdata1.concat(inputdata2);
}

export function isLeapYear(year: number): boolean {

    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        return true;
    } else {
        return false;
    }
}

export function secretHandshake(decimalNumber: number): string[] {
    if (isNaN(decimalNumber) || decimalNumber < 1 || Math.floor(decimalNumber) !== decimalNumber) {
        throw new Error("Input must be a positive integer.");
    }

    const actions: string[] = [];

    if (decimalNumber & 1) actions.push("wink");
    if (decimalNumber & 2) actions.push("double blink");
    if (decimalNumber & 4) actions.push("close your eyes");
    if (decimalNumber & 8) actions.push("jump");

    if (decimalNumber & 16) actions.reverse();

    return actions;
}