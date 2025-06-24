/*
 * This script is used to suppress specific warnings.
 */

const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');

const warnings = {
  all: (line) =>
    (line.includes('console.warn') && !line.includes('= () => {}') ? 'console.warn = () => {};' : '') + line,
  require_cycle: (line) =>
    line +
    (line.includes('function shouldPrintRequireCycle(modules)') && !line.includes('return false;')
      ? 'return false;'
      : ''),
};

const problemFilePath = path.join(process.cwd(), 'node_modules/metro-runtime/src/polyfills/require.js');
const warningToSuppress = packageJson['suppress-metro-warnings'];
if (!warningToSuppress || warningToSuppress === 'none' || !warnings[warningToSuppress]) process.exit(0);

try {
  fs.writeFileSync(
    problemFilePath,
    fs.readFileSync(problemFilePath, 'utf8').split('\n').map(warnings[warningToSuppress]).join('\n'),
    'utf8',
  );
} catch (error) {
  console.warn('Failed to suppress warnings:', error.message);
}
