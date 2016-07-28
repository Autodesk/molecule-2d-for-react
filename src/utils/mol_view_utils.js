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
import d3 from 'd3';

const molViewUtils = {
  getBondWidth(d) {
    if (!d || isNaN(parseInt(d.bond, 10))) {
      throw new Error('Invalid input');
    }
    if (d.bond < 0.5) {
      throw new Error('d.bond must be at least 0.5');
    }

    return `${d.bond * 4 - 2}px`;
  },

  chooseColor(d, defaultValue) {
    if (d.category) {
      const colorPicker = d3.scale.category20();
      return colorPicker(d.category);
    } else if (d.color) {
      return d.color;
    }
    return defaultValue;
  },

  defaultVal(test, defval) {
    if (typeof(test) === 'undefined') {
      return defval;
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
