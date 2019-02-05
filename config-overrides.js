var path = require('path');

module.exports = function override(config, env) {
    if (!config.resolve.extensions) {
        config.resolve.extensions = ['', '.js'];
    }

    config.resolve.extensions.push('.jsx');

    return config;
}