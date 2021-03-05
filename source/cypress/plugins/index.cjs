const {
  addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');

module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);

  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name === 'electron' && browser.isHeadless) {
      // fullPage screenshot size is 1400x1200
      // eslint-disable-next-line no-param-reassign
      launchOptions.preferences.width = 1400
      // eslint-disable-next-line no-param-reassign
      launchOptions.preferences.height = 1200
    }
  })
};
