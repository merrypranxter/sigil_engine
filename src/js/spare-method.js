// Spare method helper: wraps the condensing algorithm for convenience.
import { condenseStatement } from './condense.js';

/**
 * Apply the Austin Osman Spare condensing method to a statement.
 * This simply calls condenseStatement under the hood.
 * @param {string} statement
 * @returns {string[]}
 */
export function spareCondense(statement) {
  return condenseStatement(statement);
}
