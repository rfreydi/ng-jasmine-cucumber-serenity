// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './cucumber/*.feature'
  ],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        '--disable-infobars',
        '--no-sandbox',
        '--disable-gpu',
        '--window-size=1024x768',
        '--headless',
      ],
    },
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: [
      './cucumber/support/setup.ts',
      './cucumber/steps/*.step.ts'
    ]
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
  }
};
