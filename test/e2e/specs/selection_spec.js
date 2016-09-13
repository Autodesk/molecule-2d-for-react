const setup = require('../fixtures/setup');

module.exports = {
  'Selection Test': (browser) => {
    setup(browser)
      .url(browser.launchUrl)
      .waitForElementVisible('.nbmolviz2d svg', 1000, 'nbmolviz2s SVG element appears')
      .waitForElementVisible('g.node', 1000, 'Nodes are rendered in the SVG.')
      .click('g.node')
      .assert.elementPresent('g.node.selected', 'Clicking a node adds a selected class to it')
      .click('g.node:last-child')
      // Clicking a different node selects both of them
      .elements('css selector', 'g.node.selected', (result) => {
        browser.expect(result.value.length).to.equal(2);
      })
      .click('g.node')
      // Clicking a selected node unselects it
      .elements('css selector', 'g.node.selected', (result) => {
        browser.expect(result.value.length).to.equal(1);
      })
      .click('g.node:last-child')
      .assert.elementNotPresent('g.node.selected', 'Clicking all selected nodes unselects them all')
      .end();
  },
};
