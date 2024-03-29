const nxPreset = require('@nx/jest/preset').default;

module.exports = { ...nxPreset, testMatch: ['<rootDir>/src/specs/*.tsx']};
