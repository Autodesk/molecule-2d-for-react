/* global describe, it */

import { assert } from 'chai';
import molViewUtils from '../../src/utils/mol_view_utils';

describe('molViewUtils', () => {
  describe('getBondWidth', () => {
    describe('when given invalid input', () => {
      it('throws an error', () => {
        assert.throws(molViewUtils.getBondWidth.bind(null, 'words'));
        assert.throws(molViewUtils.getBondWidth.bind(null, {}));
        assert.throws(molViewUtils.getBondWidth.bind(null, { bond: 0 }));
      });
    });

    describe('when given an object with a bond number', () => {
      it('returns a pixel string', () => {
        assert.equal(molViewUtils.getBondWidth({ bond: 4 }), '14px');
      });
    });
  });
});
