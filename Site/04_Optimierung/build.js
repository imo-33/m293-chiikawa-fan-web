const { rimraf } = require('rimraf');  // rimraf als Promise-Funktion
const fs = require('fs-extra');
const path = require('path');
const { minify } = require('html-minifier-terser');
const CleanCSS = require('clean-css');

// Quell- und Zielordner definieren
const srcDir = path.join(__dirname, '04_Optimierung');
const distDir = path.join(__dirname, 'dist');

async function cleanDist() {
  await rimraf(distDir);
}

async function minifyHtml(filePath, destPath) {
  const content = await fs.readFile(filePath, 'utf-8');
  const minified = await minify(content, {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    minifyJS: true,
    minifyCSS: true,
  });
  await fs.outputFile(destPath, minified);
}

async function minifyCss(filePath, destPath) {
  const content = await fs.readFile(filePath, 'utf-8');
  const output = new CleanCSS().minify(content);
  await fs.outputFile(destPath, output.styles);
}

async function copyFiles() {
  // Kopiere alle Dateien außer HTML und CSS direkt
  await fs.copy(srcDir, distDir, {
    filter: (src) => {
      const ext = path.extname(src).toLowerCase();
      if (ext === '.html' || ext === '.css') return false;
      return true;
    }
  });
}

async function processFiles() {
  const files = await fs.readdir(srcDir);
  for (const file of files) {
    const ext = path.extname(file);
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(distDir, file);

    if (ext === '.html') {
      console.log(`Minimiere HTML: ${file}`);
      await minifyHtml(srcPath, destPath);
    } else if (ext === '.css') {
      console.log(`Minimiere CSS: ${file}`);
      await minifyCss(srcPath, destPath);
    }
  }
}

async function run() {
  try {
    console.log('Lösche Zielordner...');
    await cleanDist();

    console.log('Minimiere HTML- und CSS-Dateien...');
    await processFiles();

    console.log('Kopiere andere Ressourcen...');
    await copyFiles();

    console.log('Build fertig!');
  } catch (error) {
    console.error('Fehler:', error);
  }
}

run();
