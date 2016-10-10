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
      if (oldObject[key] instanceof Object && newObject[key] instanceof Object) {
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
    // Add or update everything in newArray to oldArray
    newArray.forEach((newModel) => {
      let found = false;
      for (let i = 0; i < oldArray.length; i += 1) {
        if (oldArray[i].id === newModel.id) {
          oldArray[i] = moleculeUtils.updateObjectInPlace(oldArray[i], newModel);
          found = true;
          break;
        }
      }

      if (!found) {
        oldArray.push(newModel);
      }
    });

    // Remove els in oldArray that don't exist in newArray
    for (let i = 0; i < oldArray.length; i += 1) {
      const oldModel = oldArray[i];
      const newModel = newArray.find(newModelI => newModelI.id === oldModel.id);

      if (!newModel) {
        oldArray.splice(i, 1);
        i -= 1;
      }
    }

    return oldArray;
  },
};

export default moleculeUtils;
