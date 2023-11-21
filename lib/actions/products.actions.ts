import { promises as fs } from "fs";

//this simulates a database call for fetching all products, filtering ideally should be done in the database itself when fetching data and limiting by pagination, however not here since we are using a json file

export async function getAllProducts() {
    var path = require("path");
    // Get the path of the json file
    const configDirectory = path.resolve(process.cwd(), "public");
    const file = await fs.readFile(configDirectory + "/data/sneakersDummyData.json", "utf8");
    const data = await JSON.parse(file);
    return data;
}

export async function getProductById({ id }: { id: string }) {
    var path = require("path");
    const configDirectory = path.resolve(process.cwd(), "public");
    const file = await fs.readFile(configDirectory + "/data/sneakersDummyData.json", "utf8");
    const data = await JSON.parse(file);
    // this would be done in the database itself when fetching data, however simulating it here for convenience parsing the id to int since in the JSON is a number, ususally would not be needed, just showing some iteration of data manipulation
    const filteredData = data.products.filter((product: any) => product.id === parseInt(id));
    return filteredData;
}
