import path from "path";
import { promises as fs } from "fs";

//this simulates a database call for fetching all products, filtering ideally should be done in the database itself when fetching data and limiting by pagination, however not here since we are using a json file

export async function getAllProducts() {
    // Get the path of the json file
    const file = await fs.readFile(process.cwd() + "/data/sneakersDummyData.json", "utf8");
    const data = JSON.parse(file);
    return data;
}
