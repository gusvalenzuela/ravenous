module.exports = {
  root: true,
  ignorePatterns: ['__sapper__', '/src/lib/*.js', '/src/lib/**/*.js'],
  extends: ['eslint:recommended', 'prettier'],
  //   parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020, // Use the latest ecmascript standard
    sourceType: 'module', // Allows using import/export statements
  },
  settings: {
    // svelte: {
    //   version: 'detect', // Automatically detect the svelte version
    // },
  },
  env: {
    es6: true,
    browser: true, // Enables browser globals like window and document
    amd: true, // Enables require() and define() as global variables as per the amd spec.
    node: true, // Enables Node.js global variables and Node.js scoping.
  },
  plugins: ['svelte3'],
  overrides: [
    {
      files: ['**/*.svelte/*.js'],
      processor: 'svelte3/svelte3',
    },
  ],
  rules: {
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_id'],
      },
    ],
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
  },
}
