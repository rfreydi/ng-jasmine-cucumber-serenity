const
  { ConsoleReporter } = require('@serenity-js/console-reporter'),
  { ArtifactArchiver } = require('@serenity-js/core'),
  { SerenityBDDReporter } = require('@serenity-js/serenity-bdd');

exports.config = {
  chromeDriver: require('chromedriver/lib/chromedriver').path,
  SELENIUM_PROMISE_MANAGER: false,
  allScriptsTimeout: 11000,
  specs: [
    'serenity/*.feature'
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
  framework:      'custom',
  frameworkPath:  require.resolve('@serenity-js/protractor/adapter'),
  serenity: {
    crew: [
      ArtifactArchiver.storingArtifactsAt('./target/site/serenity'),
      new SerenityBDDReporter(),
      ConsoleReporter.forDarkTerminals(),
    ]
  },
  cucumberOpts: {
    require: [
      'e2e/serenity/support/setup.ts',
      'e2e/serenity/steps/*.step.ts'
    ]
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
  }
};
