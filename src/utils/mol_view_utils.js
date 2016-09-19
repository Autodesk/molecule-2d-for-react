/**
 * Copyright 2016 Autodesk Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const molViewUtils = {
  getBondWidth(d) {
    if (!d || isNaN(parseInt(d.bond, 10))) {
      throw new Error('Invalid input');
    }
    if (d.bond < 0) {
      throw new Error('d.bond must be at least 0');
    }

    return `${(d.bond * 4) - 2}px`;
  },

  chooseColor(d, defaultValue) {
    const color = d.category || d.color;
    if (color) {
      return color;
    }
    return defaultValue;
  },

  withDefault(test, defaultValue) {
    if (typeof test === 'undefined') {
      return defaultValue;
    }

    return test;
  },

  /*
  bondClickCallback(mywidget) { // not hooked up yet
      mywidget.model.set('clicked_bond_indices',
          [this.attributes.sourceIndex.value*1,
              this.attributes.targetIndex.value*1]);
      mywidget.model.save();
  },
  */
};

export default molViewUtils;
