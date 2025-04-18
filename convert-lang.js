import fs from 'fs-extra';
import path from 'path';
import phpParser from 'php-parser';

const __dirname = path.resolve();

const parser = new phpParser.Engine({
  parser: { extractDoc: true },
  ast: { withPositions: false },
});

const langPath = path.join(__dirname, "resources"); // your Laravel lang folder
const outputPath = path.join(__dirname, "lang-json");

fs.ensureDirSync(outputPath);

function phpArrayToJson(astNode) {
  const result = {};
  for (const item of astNode.items) {
    const key = item.key.value;
    if (item.value.kind === "array") {
      result[key] = phpArrayToJson(item.value);
    } else if (item.value.kind === "string") {
      result[key] = item.value.value;
    } else {
      result[key] = null;
    }
  }
  return result;
}

function parseLangFolder(langDir) {
  const files = fs.readdirSync(langDir).filter(f => f.endsWith(".php"));
  const result = {};

  for (const file of files) {
    const content = fs.readFileSync(path.join(langDir, file), "utf8");

    try {
      const ast = parser.parseCode(content);
      const returnNode = ast.children.find(n => n.kind === "return");

      if (returnNode && returnNode.expr.kind === "array") {
        const key = path.basename(file, ".php");
        result[key] = phpArrayToJson(returnNode.expr);
      }
    } catch (e) {
      console.error(e);
      console.error(`Failed to parse ${file}:`, e.message);
    }
  }

  return result;
}

// Loop through each language folder
fs.readdirSync(langPath).forEach(lang => {
  const langDir = path.join(langPath, lang);
  if (fs.statSync(langDir).isDirectory()) {
    const jsonData = parseLangFolder(langDir);
    const outputFile = path.join(outputPath, `${lang}.json`);
    fs.writeJsonSync(outputFile, jsonData, { spaces: 2 });
    console.log(`Generated: ${outputFile}`);
  }
});