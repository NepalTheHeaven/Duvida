const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Firebase v9+ requires .cjs support in Metro
config.resolver.sourceExts.push('cjs');

// Disable unstable package exports which can cause "Component auth not registered"
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
