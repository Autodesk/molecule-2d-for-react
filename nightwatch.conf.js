const fs = require('fs');
const seleniumDownload = require('selenium-download');

const BINPATH = './node_modules/nightwatch/bin/';

const config = {
  src_folders: [
    'test/e2e', // Where you are storing your Nightwatch e2e/UAT tests
  ],
  output_folder: './reports', // reports (test outcome) output by nightwatch
  selenium: { // downloaded by selenium-download module (see readme)
    start_process: true, // tells nightwatch to start/stop the selenium process
    server_path: `${BINPATH}selenium.jar`,
    log_path: '',
    host: '127.0.0.1',
    port: 4444, // standard selenium port
    cli_args: { // chromedriver is downloaded by selenium-download (see readme)
      'webdriver.chrome.driver': `${BINPATH}chromedriver`,
    },
  },
  test_settings: {
    default: {
      screenshots: {
        enabled: false,
        path: './screenshots',
      },
      globals: {
        waitForConditionTimeout: 5000, // sometimes internet is slow so wait.
      },
      launch_url: 'http://localhost:4000',
      desiredCapabilities: { // use Chrome as the default browser for tests
        browserName: 'chrome',
        javascriptEnabled: true,
      },
    },
  },
};

/**
 * selenium-download does exactly what it's name suggests;
 * downloads (or updates) the version of Selenium (& chromedriver)
 * on your localhost where it will be used by Nightwatch.
 */
fs.stat(`${BINPATH}selenium.jar`, (err, stat) => {
  if (err || !stat || stat.size < 1) {
    seleniumDownload.ensure(BINPATH, (error) => {
      if (error) throw new Error(error);
      console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH);
    });
  }
});

module.exports = config;
