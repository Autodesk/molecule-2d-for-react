module.exports = {
  'Selection' : function (browser) {
    browser
      .url('http://localhost:4000')
      .waitForElementVisible('.nbmolviz2d svg', 1000, 'nbmolviz2s SVG element appears')
      .waitForElementVisible('g.node', 1000, 'Nodes are rendered in the SVG.')
      .click('g.node')
      .pause(1000)
      .assert.elementPresent('g.node.selected', 'Clicking a node adds a selected class to it')
      .end();
  }
};
