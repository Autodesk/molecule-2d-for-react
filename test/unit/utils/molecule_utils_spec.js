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

  describe('updateObjectInPlace', () => {
    let oldObject;
    let newObject;

    describe('when given a flat object', () => {
      beforeEach(() => {
        oldObject = {
          one: 1,
          two: 2,
        };
        newObject = {
          one: 33,
          two: 'fdsa',
          four: 'what?',
        };
      });

      it('returns the same object but with newObject\'s data', () => {
        const result = moleculeUtils.updateObjectInPlace(oldObject, newObject);
        expect(result).to.equal(oldObject);
        expect(result.one).to.equal(newObject.one);
        expect(result.two).to.equal(newObject.two);
        expect(result.four).to.equal(newObject.four);
      });
    });

    describe('when given an object with a nested object', () => {
      beforeEach(() => {
        oldObject = {
          one: 1,
          obj: {
            two: 2,
          },
        };
        newObject = {
          one: 33,
          obj: {
            two: 22,
          },
        };
      });

      it('returns the same object but with newObject\'s data at the first level', () => {
        const result = moleculeUtils.updateObjectInPlace(oldObject, newObject);
        expect(result).to.equal(oldObject);
        expect(result.one).to.equal(newObject.one);
      });

      it('returns an object whose nested object is the same as oldObject\'s but with newObject\'s data', () => {
        const result = moleculeUtils.updateObjectInPlace(oldObject, newObject);
        expect(result.obj).to.equal(oldObject.obj);
        expect(result.obj.two).to.equal(newObject.obj.two);
      });
    });
  });

  describe('updateModelsInPlace', () => {
    let oldModels;
    let newModels;

    describe('when given a nonexistant element', () => {
      beforeEach(() => {
        oldModels = [];
        newModels = [
          { id: 0 },
        ];
      });

      it('returns oldModels with the new model added', () => {
        const result = moleculeUtils.updateModelsInPlace(oldModels, newModels);
        expect(result).to.equal(oldModels);
        expect(result[0]).to.equal(newModels[0]);
      });
    });

    describe('when given an existing element', () => {
      beforeEach(() => {
        oldModels = [
          { id: 0 },
        ];
        newModels = [
          { id: 0, something: true },
        ];
      });

      it('returns oldModels with that element modified with new data', () => {
        const result = moleculeUtils.updateModelsInPlace(oldModels, newModels);
        expect(result).to.equal(oldModels);
        expect(result[0]).to.equal(oldModels[0]);
        expect(result[0].booped).to.equal(newModels[0].something);
      });
    });
  });
});
