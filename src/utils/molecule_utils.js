const moleculeUtils = {
  /**
   * Given two arrays of ids, return true if they contain the same values in any order,
   * ignoring duplicates
   * @param idsA {Array}
   * @param idsB {Array}
   * @returns {Boolean}
   */
  compareIds(idsA, idsB) {
    // If one array is empty and the other isn't, they can't contain the same values
    if ((!idsA.length && idsB.length) || (idsA.length && !idsB.length)) {
      return false;
    }

    const setA = new Set();

    for (let i = 0; i < idsA.length; i += 1) {
      setA.add(idsA[i]);
    }

    for (let i = 0; i < idsB.length; i += 1) {
      if (!setA.has(idsB[i])) {
        return false;
      }
    }

    return true;
  },

  /**
   * Due to craziness of D3, we need to keep our main modelData state as the same object and mutate
   * it in place.  The same goes for all sub-objects within modelData.
   * @param oldModelData {Object}
   * @param newModelData {Object}
   * @returns {Object}
   */
  updateObjectInPlace(oldObject, newObject) {
    Object.keys(newObject).forEach((key) => {
      if (oldObject[key] instanceof Object && !(oldObject[key] instanceof Array)) {
        oldObject[key] = moleculeUtils.updateObjectInPlace(oldObject[key], newObject[key]);
      } else {
        oldObject[key] = newObject[key];
      }
    });

    return oldObject;
  },

  /**
   * Given old and new arrays of models, update the old array's models in place based on id
   * O(n^2) :(
   * @param oldArray {Array}
   * @param newArray {Array}
   * @returns {Array}
   */
  updateModelsInPlace(oldArray, newArray) {
    newArray.forEach((model) => {
      let found = false;
      for (let i = 0; i < oldArray.length; i += 1) {
        if (oldArray[i].id === model.id) {
          oldArray[i] = moleculeUtils.updateObjectInPlace(oldArray[i], model);
          found = true;
          break;
        }
      }

      if (!found) {
        oldArray.push(model);
      }
    });

    return oldArray;
  },
};

export default moleculeUtils;
