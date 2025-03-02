import fs from "fs";

const filePath = "./assets/frontend_assets/asset.js"; // Path to your assets file

const restoreFile = () => {
  try {
    let fileContent = fs.readFileSync(filePath, "utf-8");

    // ✅ Step 1: Restore Imports
    fileContent = fileContent.replace(/\/\/ Removed import: (\w+) from ["'](.+?)["'];?/g, (_, varName, path) => {
      return `import ${varName} from "${path}";`;
    });

    // ✅ Step 2: Restore Variable Usage in `image` Fields
    fileContent = fileContent.replace(/"(\w+)"/g, (_, varName) => {
      return varName;
    });

    // ✅ Step 3: Write the Restored File
    fs.writeFileSync(filePath, fileContent, "utf-8");

    console.log("🎉 assets.js has been restored successfully!");
  } catch (error) {
    console.error("❌ Error restoring assets.js:", error);
  }
};

// Run the script
restoreFile();
