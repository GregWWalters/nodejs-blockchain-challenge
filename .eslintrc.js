module.exports = {
  'env': {
    'es6': 'true',
    'node': true,
  },
  'extends': ['eslint:recommended', 'airbnb/base'],
  'parserOptions': { 'sourceType': 'module' },
  'rules': {
    'max-len': ['error', {
      'code': 80,
      'tabWidth': 2,
      'ignoreUrls': true,
      'ignoreRegExpLiterals': true,
    }],
    'one-var': ['warn', 'consecutive'],
  },
};
