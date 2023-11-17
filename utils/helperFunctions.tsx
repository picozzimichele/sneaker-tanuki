export function capitalizeString(str: string) {
    const lowerCaseString = str.toLowerCase(), // convert string to lower case
        firstLetter = str.charAt(0).toUpperCase(), // upper case the first character
        strWithoutFirstChar = lowerCaseString.slice(1); // remove first character from lower case string
    return firstLetter + strWithoutFirstChar;
}

export function splitName(name: string) {
    const splitName = name.split(" ").slice(0, 3).join(" ");
    return splitName;
}
