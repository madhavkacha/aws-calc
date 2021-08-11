// conf.js
exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec.js'],
    capabilities: {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--headless', '--lang=EN', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--window-size=1920,1080'],
        prefs: { intl: { accept_languages: "en-US,en;q=0.5" } }
      }
    }
}
