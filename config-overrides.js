module.exports = function override(config) {
  const modifiedConfig = config;
  if (!config.resolve.extensions) {
    modifiedConfig.resolve.extensions = ['', '.js'];
  }

  modifiedConfig.entry = './src/index.jsx';
  modifiedConfig.resolve.extensions.push('.jsx');

  return modifiedConfig;
};
