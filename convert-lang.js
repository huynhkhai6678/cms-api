const fs = require('fs');
const path = require('path');
const parser = require('php-parser');

const phpParser = new parser.Engine({
  parser: {
    extractDoc: true,
    php7: true
  },
  ast: {
    withPositions: false
  }
});

function phpArrayToJson(ast) {
  const result = {};

  if (ast.kind === 'program') {
    const returnStmt = ast.children.find(node => node.kind === 'return');
    if (returnStmt && returnStmt.expr.kind === 'array') {
      return parseArray(returnStmt.expr);
    }
  }

  return result;
}

function parseArray(arr) {
  const result = {};
  arr.items.forEach(item => {
    const key = getValue(item.key);
    const value = getValue(item.value);
    result[key] = value;
  });
  return result;
}

function getValue(node) {
  if (!node) return null;

  if (node.kind === 'string' || node.kind === 'number') {
    return node.value;
  }

  if (node.kind === 'array') {
    return parseArray(node);
  }

  return null;
}

function convertPhpLangFileToJson(inputPath, outputPath) {
  const phpCode = fs.readFileSync(inputPath, 'utf8');
  const ast = phpParser.parseCode(phpCode);
  const json = phpArrayToJson(ast);

  fs.writeFileSync(outputPath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`✅ Converted: ${inputPath} ➝ ${outputPath}`);
}

// Usage example:
const langs = ['en', 'de']; // Add your language folders here
const namespace = 'messages'; // Laravel file name

langs.forEach(lang => {
  const inputFile = path.join(__dirname, 'resources', 'lang', lang, `${namespace}.php`);
  const outputFile = path.join(__dirname, 'locales', lang, `${namespace}.json`);
  convertPhpLangFileToJson(inputFile, outputFile);
});