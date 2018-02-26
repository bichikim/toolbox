module.exports = function(config) {
  return {
    browsers: ['ChromeWithoutSecurity'],
    frameworks: ['mocha', 'chai'],
    reporters: ['spec'],
    files: [
      {pattern: './src/**/*.spec.js', watched: false},
    ],
    exclude: [],
    preprocessors: {
      './src/**/*.js': ['webpack', 'sourcemap'],
    },
    webpack: require('../build/webpack.test.conf.js'),
    webpackMiddleware: {
      noInfo: true,
    },
    logLevel: config.LOG_INFO,
    colors: true,
    customLaunchers: {
      ChromeWithoutSecurity: {
        base: 'Chrome',
        flags: ['--disable-web-security'],
      },
    },
    mime: {
      'text/x-typescript': ['ts'],
    },
  }
}