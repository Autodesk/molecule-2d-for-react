/* global describe, it, before, after, beforeEach, afterEach */

import { assert, expect } from 'chai';
import 'babel-polyfill';
import moleculeUtils from '../../../src/utils/molecule_utils';

describe('moleculeUtils', () => {
  describe('compareIds', () => {
    let idsA;
    let idsB;

    describe('when given empty arrays', () => {
      beforeEach(() => {
        idsA = [];
        idsB = [];
      });

      it('returns true', () => {
        expect(moleculeUtils.compareIds(idsA, idsB)).to.equal(true);
      });
    });

    describe('when one array is empty and the other isn\'t', () => {
      beforeEach(() => {
        idsA = [1];
        idsB = [];
      });

      it('returns false', () => {
        expect(moleculeUtils.compareIds(idsA, idsB)).to.equal(false);
      });
    });

    describe('when arrays have totally different values', () => {
      beforeEach(() => {
        idsA = [1, 2, 3];
        idsB = [4, 5, 6];
      });

      it('returns false', () => {
        expect(moleculeUtils.compareIds(idsA, idsB)).to.equal(false);
      });
    });

    describe('when arrays have some (but not all) overlapping values', () => {
      beforeEach(() => {
        idsA = [1, 2, 3];
        idsB = [2, 3, 4];
      });

      it('returns false', () => {
        expect(moleculeUtils.compareIds(idsA, idsB)).to.equal(false);
      });
    });

    describe('when arrays have same exact values in order', () => {
      beforeEach(() => {
        idsA = [1, 2, 3];
        idsB = [1, 2, 3];
      });

      it('returns false', () => {
        expect(moleculeUtils.compareIds(idsA, idsB)).to.equal(true);
      });
    });

    describe('when arrays have same exact values in different order', () => {
      beforeEach(() => {
        idsA = [1, 2, 3];
        idsB = [2, 3, 1];
      });

      it('returns false', () => {
        expect(moleculeUtils.compareIds(idsA, idsB)).to.equal(true);
      });
    });

    describe('when arrays have same values with duplicates', () => {
      beforeEach(() => {
        idsA = [1, 2, 3];
        idsB = [2, 3, 1, 1, 1, 1, 2];
      });

      it('returns false', () => {
        expect(moleculeUtils.compareIds(idsA, idsB)).to.equal(true);
      });
    });

    describe('when arrays have some (not all) same values with duplicates', () => {
      beforeEach(() => {
        idsA = [1, 2, 3];
        idsB = [2, 3, 1, 1, 1, 1, 2, 4];
      });

      it('returns false', () => {
        expect(moleculeUtils.compareIds(idsA, idsB)).to.equal(false);
      });
    });
  });
});
