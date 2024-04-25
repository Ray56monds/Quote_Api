module.exports = {
    testEnvironment: 'node',
    verbose: true,
    roots: ['<rootDir>/tests'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$',
    moduleFileExtensions: ['js', 'json', 'node'],
    coveragePathIgnorePatterns: [
      '/node_modules/',
      '/tests/',
      '/controllers/',
      '/utils/',
      '/routes/',
      '/database/',
      '/models/',
    ],
  };
  