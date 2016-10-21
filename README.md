# Molecule2d
This project provides a React component that displays an interactive 2D representation of any molecule using D3.

<img src="https://raw.githubusercontent.com/Autodesk/molecule-2d-for-react/master/doc/viewer_screenshot.png" alt="screen shot" width="300" />

## Installation

    npm install molecule-2d-for-react

## Usage
  <Molecule2d
    modelData={{
      nodes: [
        { id: 0, atom: 'H' },
        ...
      ],
      links: [
        { id: 0, source: 0, target: 1, strength: 1, distance: 30.0, bond: 1 },
        ...
      ],
    }}
  />

See example/js/main.js for a working example.

## Props
In order to set up your molecule visualization, just pass in the proper props data to the React component. Here are all of the parameters with explanations:

### modelData {Object} Required
An object indicating the atoms an bonds to display.  Of the form:

    {
      nodes: [
        { id: 0, atom: 'H' },
        ...
      ],
      links: [
        { id: 0, source: 0, target: 1, strength: 1, distance: 30.0, bond: 1 },
        ...
      ],
    }

See example/js/bipyridine.js for an example of working modelData for a real molecule.

### selectedAtomIds {Array of Numbers} [[]]
An array of atom ids to display as selected.  This is deep copied into internal state and updated whenever the user clicks on an atom.  See the `onChangeSelection` method below for how to listen to selection changes.

### width {Number} [500]
The width of the SVG element.

### height {Number} [500]
The height of the SVG element.

### onChangeSelection {Function}
Called whenever selectedAtomIds is changed.  Passed selectedAtomIds.

## Use in a Jupyter notebook
It's also very easy to adapt this to work in a Jupyter Notebook as an [ipywidgets](https://github.com/ipython/ipywidgets) module, as it was made for the [Molecular Design Toolkit](https://github.com/Autodesk/molecular-design-toolkit) project. The [source code](https://github.com/Autodesk/notebook-molecular-visualization/blob/30e843393135d8b2d78ac055a6e366eb9c0ffde9/js/src/nbmolviz_2d_component.jsx) shows how this was done by wrapping this project in a Backbone view.

## Development
A typical development flow might be to run the example while editing the code, where you'll want any changes to be immediately reflected in the example running in the browser.  In that case you should run:

    npm run example

### Development within another project
If you're using this in another project and want to make changes to this repository locally and see them reflected in your other project, first you'll need to do some setup.  You can point your other project to use the local copy of Molecule2d like this:

    cd ~/path/to/molecule-2d-for-react
    npm link
    cd ~/path/to/other-project
    npm link molecule-2d-for-react

See [this great blog post](http://justjs.com/posts/npm-link-developing-your-own-npm-modules-without-tears) for more info on `npm link`.

Once you've linked your other project, you'll need to build Molecule2d (and likely your other project, too) every time you want your changes to reflect in your other project.  You can do this manually with `npm run build`.  If you want to rebuild Molecule2d automatically every time a change is made, run `npm run watch`.

### Running Tests
Unit tests can be run with:

    npm test

End-to-end tests can be run with:

    npm run e2e

### Releasing a new version
A new version should be released via npm every time new code is merged to master.  Currently, this process is manual and obviously must be done by a collaborator of the npm package.

On master, upgrading the version looks like the following:

    npm version patch -m "Upgrade to %s for reasons"
    git push origin master
    git push origin --tags
    npm publish

## License

Copyright 2016 Autodesk Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.


## Contributing

This project is developed and maintained by the [Molecular Design Toolkit](https://github.com/autodesk/molecular-design-toolkit) project. Please see that project's [CONTRIBUTING document](https://github.com/autodesk/molecular-design-toolkit/CONTRIBUTING.md) for details.
