import ejs from "ejs";
import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

async function generatePDF(data, templateName = 'invoice', outputPath = 'output.pdf') {
  
  const templatePath = path.join(__dirname, `../templates/${templateName}.ejs`);
  const cssPath = path.join(__dirname, '../public/css/pdf.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');

  const html = await ejs.renderFile(templatePath, data);
  const finalHtml = html.replace(
    '<link href="pdf.css" rel="stylesheet">',
    `<style>${cssContent}</style>`
  );

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setContent(finalHtml, { waitUntil: 'load' });

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
  });

  await browser.close();

  return outputPath;
}

export default generatePDF;