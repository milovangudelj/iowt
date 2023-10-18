import * as fs from "fs";
import * as path from "path";

// Specify the directory where your country flag components are located.
const directoryPath = "./countries/svg";

fs.readdirSync(directoryPath).forEach((file) => {
  if (file.endsWith(".svg")) {
    const country = path.basename(file, ".svg");

    // files are named using their code and name like this: 'AD - Andorra.svg'
    const countryCode = country.split(" - ")[0];
    const countryName = country.split(" - ")[1];

    console.log(`${countryCode} - ${countryName}`);
  }
});

console.log("All files updated.");
