// Condense a statement by removing vowels, duplicate letters, and non-letter characters.

/**
 * Condense a statement of intent into a sequence of unique consonants.
 * 1. Normalises the string to uppercase and strips non-letter characters.
 * 2. Removes vowels (A,E,I,O,U).
 * 3. Removes duplicate letters while preserving order.
 *
 * @param {string} statement - Input string from the user.
 * @returns {string[]} Array of uppercase consonant characters.
 */
export function condenseStatement(statement) {
  const cleaned = (statement || '')
    .toUpperCase()
    .replace(/[^A-Z]/g, '');
  const vowels = new Set(['A', 'E', 'I', 'O', 'U']);
  const result = [];
  for (const c of cleaned) {
    if (vowels.has(c)) continue;
    if (!result.includes(c)) {
      result.push(c);
    }
  }
  return result;
}
