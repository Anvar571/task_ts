module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testRegex: '(/test/.*|(\\.|/)(test|spec))\\.ts$',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};