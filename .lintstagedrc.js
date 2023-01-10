module.exports = {
  './src/**/*.{ts,tsx}': 'eslint --ignore-path .gitignore',
  '*': ['editorconfig-checker', 'prettier --ignore-path .gitignore --ignore-unknown --check']
};
