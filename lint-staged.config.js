module.exports = {
  '**/*.{js,jsx,ts,tsx}': (filenames) => [`yarn eslint --fix ${filenames.join(' ')}`],
  '**/*.(md|json)': (filenames) => `yarn prettier --write ${filenames.join(' ')}`,
};
