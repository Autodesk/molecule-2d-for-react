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
};

export default moleculeUtils;
