/**
 * R1C1 pattern
 *
 * @type {RegExp}
 */

var R1C1 = /^R(\d+)C(\d+)$/;

/**
 * A1 pattern
 *
 * @type {RegExp}
 */

var A1 = /^([A-Z]+)(\d+)$/;

/**
 * Convert A1 notation to R1C1 notation
 *
 * @param {string} ref
 * @returns {string}
 * @throws {Error}
 */

function A1toR1C1(ref) {
  if (!A1.test(ref)) {
    throw new Error(ref + ' is not a valid A1 cell reference');
  }

  var refParts = ref
    .replace(A1, '$1,$2')
    .split(',');

  var columnStr = refParts[0];
  var row = refParts[1];
  var column = 0;

  for (var i = 0; i < columnStr.length; i++) {
    column = 26 * column + columnStr.charCodeAt(i) - 64;
  }

  return 'R' + row + 'C' + column;
}

/**
 * Convert R1C1 notation to A1 notation
 *
 * @param {string} ref
 * @returns {string}
 * @throws {Error}
 */

function R1C1toA1(ref) {
  if (!R1C1.test(ref)) {
    throw new Error(ref + ' is not a valid R1C1 cell reference');
  }

  var refParts = ref
    .replace(R1C1, '$1,$2')
    .split(',');

  var row = refParts[0];
  var column = refParts[1];
  var columnStr = '';

  for (; column; column = Math.floor(column / 26)) {
    columnStr = String.fromCharCode((column % 26) + 64) + columnStr;
  }

  return columnStr + row;
}

/**
 * Auto detects notation used and converts to the opposite notation
 *
 * @param {string} ref
 * @returns {string}
 * @throws {Error}
 */

function cellref(ref) {
  if (R1C1.test(ref)) {
    return R1C1toA1(ref);
  }

  if (A1.test(ref)) {
    return A1toR1C1(ref);
  }

  throw new Error('could not detect cell reference notation for ' + ref);
}

/**
 * Exports
 */

module.exports = cellref;
module.exports.toA1 = R1C1toA1;
module.exports.toR1C1 = A1toR1C1;
