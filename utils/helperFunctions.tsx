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

export function getValuesAndQuantities(
    inputArray: string[]
): { value: string; quantity: number }[] {
    // Create an empty object to store the counts of each value
    const counts: { [key: string]: number } = {};

    // Iterate over the input array and count the occurrences of each value
    inputArray?.forEach((value) => {
        counts[value] = (counts[value] || 0) + 1;
    });

    // Convert the counts object into an array of objects with value and quantity
    const resultArray: { value: string; quantity: number }[] = Object.keys(counts)?.map(
        (value) => ({
            value,
            quantity: counts[value],
        })
    );

    return resultArray;
}
