import * as fs from "fs";
import * as path from "path";

// Specify the directory where your country flag components are located.
const directoryPath = "./countries";

fs.readdirSync(directoryPath).forEach((file) => {
  if (file.endsWith(".tsx")) {
    const countryCode = path.basename(file, ".tsx");
    const filePath = path.join(directoryPath, file);

    // Read the content of the file.
    let fileContent = fs.readFileSync(filePath, "utf-8");

    // Replace the default export with a named export.
    fileContent = fileContent.replace(
      /export default function ([^{]+) {/,
      `export function ${countryCode}() {`
    );

    // Write the modified content back to the file.
    fs.writeFileSync(filePath, fileContent);

    console.log(`Modified: ${file}`);
  }
});

console.log("All files updated.");
