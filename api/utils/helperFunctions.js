/**
 * @description - This is a class that contains helper functions used across the application.
 */
class HelperFunctions {
  /**
   * @description - This method is used to capitalize the first letter of every word in a string.
   * @param {string} string - The string sent.
   * @returns {string} - Returns a formatted string with capitalized first letter of every word.
   */
  /**
   * Capitalize all names and initials in a string.
   * @param {string} string - The input string.
   * @returns {string} - The string with all names and initials capitalized.
   */
  static capitalizeAllNamesAndInitials(string) {
    if (typeof string !== 'string' || string.length === 0) {
      return string;
    }

    const words = string.split(' ');

    const capitalizedWords = words.map((word) => {
      if (word.length > 1) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return word;
      }
    });

    return capitalizedWords.join(' ');
  }
}

module.exports = HelperFunctions;
