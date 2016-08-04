# nbmolviz2d
This project provides a 2D visualization of any molecule using D3 and Backbone.  It's also very easy to adapt this to work in a Jupyter Notebook as an [ipywidgets](https://github.com/ipython/ipywidgets) module, as it was made for the [Molecular Design Toolkit](https://github.com/Autodesk/molecular-design-toolkit) project.

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

## License

Copyright 2016 Autodesk Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.


## Contributing

This project is developed and maintained by the [Molecular Design Toolkit](https://github.com/autodesk/molecular-design-toolkit) project. Please see that project's [CONTRIBUTING document](https://github.com/autodesk/molecular-design-toolkit/CONTRIBUTING.md) for details.
