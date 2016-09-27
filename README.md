# nbmolviz2d
This project provides a 2D visualization of any molecule using D3 and Backbone.  It's also very easy to adapt this to work in a Jupyter Notebook as an [ipywidgets](https://github.com/ipython/ipywidgets) module, as it was made for the [Molecular Design Toolkit](https://github.com/Autodesk/molecular-design-toolkit) project.

<img src="https://raw.githubusercontent.com/Autodesk/nbmolviz2d/master/doc/viewer_screenshot.png" alt="screen shot" width="300" />

## Installation

    npm install nbmolviz2d

## Usage
nbmolviz2d is a Backbone module, so you can use it like this:

    import Backbone from 'backbone';
    import { Nbmolviz2dModel, Nbmolviz2dView } from 'nbmolviz2d';

    const model = new MolWidget2DModel();
    const view = new MolWidget2DView({
      model,
      el: document.querySelector('.app'),
    });

    view.render();

See example/js/main.js for a working example.

## API
In order to set up your molecule visualization, just pass in the proper data to MolWidget2DModel. Here are all of the parameters with explanations:

### graph {Object} [H2O]
An object indicating the atoms and bonds to display.  Of the form:

    {
      nodes: [
        { atom: 'H', category: 'blue', index: 0, id: 0 },
        ...
      ],
      links: [
        { source: 0, target: 2, bond: 1, category: 0 },
        ...
      ],
    }

### selected_atom_indices {Array of Numbers} [[]]
An array of atom indices to display as selected.  This will also update whenever the user clicks on an atom.

### width {Number} [500]
The width of the SVG element.

### height {Number} [500]
The height of the SVG element.

### onChangeSelection {Function}
Called whenever selectedAtomIds is changed.  Passed selectedAtomIds.

## Development
A typical development flow might be to run the example while editing the code, where you'll want any changes to be immediately reflected in the example running in the browser.  In that case you should run:

    npm run example

### Development within another project
If you're using this in another project and want to make changes to this repository locally and see them reflected in your other project, first you'll need to do some setup.  You can point your other project to use the local copy of nbmolviz2d like this:

    cd ~/path/to/nbmolviz2d
    npm link
    cd ~/path/to/other-project
    npm link nbmolviz2d

See [this great blog post](http://justjs.com/posts/npm-link-developing-your-own-npm-modules-without-tears) for more info on `npm link`.

Once you've linked your other project, you'll need to build nbmolviz2d (and likely your other project, too) every time you want your changes to reflect in your other project.  You can do this manually with `npm run build`.  If you want to rebuild nbmolviz2d automatically every time a change is made, run `npm run watch`.

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
