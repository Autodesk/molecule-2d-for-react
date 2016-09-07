/* global describe, it, before, after, beforeEach, afterEach */

import { assert, expect } from 'chai';
import sinon from 'sinon';
import d3 from 'd3';
import molViewUtils from '../../src/utils/mol_view_utils';

describe('molViewUtils', () => {
  describe('getBondWidth', () => {
    describe('when given invalid input', () => {
      it('throws an error', () => {
        assert.throws(molViewUtils.getBondWidth.bind(null, 'words'));
        assert.throws(molViewUtils.getBondWidth.bind(null, {}));
        assert.throws(molViewUtils.getBondWidth.bind(null, { bond: -1 }));
      });
    });

    describe('when given an object with a bond number', () => {
      it('returns a pixel string', () => {
        assert.equal(molViewUtils.getBondWidth({ bond: 4 }), '14px');
      });
    });
  });

  describe('chooseColor', () => {
    const color = '#abcdef';
    let d = {};

    beforeEach(() => {
      d = {};
    });

    describe('when d has a category', () => {
      beforeEach(() => {
        d.category = color;
      });

      it('chooses the corresponding color from d3\'s color palette', () => {
        expect(molViewUtils.chooseColor(d)).to.equal(color);
      });
    });

    describe('when d has a color and not a category', () => {
      beforeEach(() => {
        d.color = color;
      });

      it('returns d.color', () => {
        expect(molViewUtils.chooseColor(d)).to.equal(color);
      });
    });

    describe('when d has no color and no category', () => {
      it('returns defaultValue', () => {
        expect(molViewUtils.chooseColor(d, color)).to.equal(color);
      });
    });
  });

  describe('withDefault', () => {
    const defaultValue = 'imadefaultValue';
    let test;

    describe('when given an undefined test value', () => {
      before(() => {
        test = undefined;
      });

      it('returns defaultValue', () => {
        assert.equal(molViewUtils.withDefault(undefined, defaultValue), defaultValue);
      });
    });

    describe('when give a test value that\'s not undefined', () => {
      before(() => {
        test = 'imatestval';
      });

      it('returns test', () => {
        assert.equal(molViewUtils.withDefault(test, defaultValue), test);
      });
    });
  });
});
