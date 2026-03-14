const fs = require("fs");
const path = require("path");

const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
const outDir = path.join(__dirname, "docs", "api");

fs.mkdirSync(outDir, { recursive: true });

for (const [name, data] of Object.entries(db)) {
  fs.writeFileSync(
    path.join(outDir, `${name}.json`),
    JSON.stringify(data, null, 2)
  );
  console.log(`  docs/api/${name}.json (${data.length} items)`);
}

console.log(`\nGenerated ${Object.keys(db).length} JSON files`);
